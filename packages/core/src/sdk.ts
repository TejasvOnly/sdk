import {
  DeviceCommunicationError,
  DeviceCommunicationErrorType,
  IDeviceConnection,
} from '@cypherock/sdk-interfaces';
import * as bootloaderOperations from './operations/bootloader';
import * as legacyOperations from './operations/legacy';
import * as operations from './operations/proto';
import * as rawOperations from './operations/raw';
import {
  isSDKSupported,
  getPacketVersionFromSDK,
  formatSDKVersion,
} from './utils/sdkVersions';
import { PacketVersion, PacketVersionMap } from './utils/packetVersions';

export default class SDK {
  private readonly version: string;

  private readonly packetVersion: PacketVersion;

  private readonly connection: IDeviceConnection;

  private readonly isSDKSupported: boolean;

  private readonly isNewer: boolean;

  private readonly appletId?: number;

  private constructor(
    connection: IDeviceConnection,
    version: string,
    packetVersion: PacketVersion,
    appletId?: number,
  ) {
    this.connection = connection;
    this.version = version;
    this.packetVersion = packetVersion;
    this.appletId = appletId;

    const supportData = isSDKSupported(version);
    this.isSDKSupported = supportData.isSupported;
    this.isNewer = supportData.isNewer;
  }

  public static async create(connection: IDeviceConnection, appletId?: number) {
    const sdkData = await SDK.getSDKVersion(connection);
    return new SDK(
      connection,
      sdkData.sdkVersion,
      sdkData.packetVersion,
      appletId,
    );
  }

  public getVersion() {
    return this.version;
  }

  public isSupported() {
    return this.isSDKSupported;
  }

  public isSDKNewer() {
    return this.isNewer;
  }

  public async sendLegacyCommand(command: number, data: string) {
    return legacyOperations.sendData(
      this.connection,
      command,
      data,
      PacketVersionMap.v1,
    );
  }

  public async receiveLegacyCommand(commands: number[], timeout?: number) {
    return legacyOperations.receiveCommand(
      this.connection,
      commands,
      PacketVersionMap.v1,
      timeout,
    );
  }

  public getSequenceNumber() {
    return this.connection.getSequenceNumber();
  }

  public getNewSequenceNumber() {
    return this.connection.getNewSequenceNumber();
  }

  public async sendCommand(params: {
    commandType: number;
    data: string;
    sequenceNumber: number;
    maxTries?: number;
  }): Promise<void> {
    await rawOperations.sendCommand({
      connection: this.connection,
      data: params.data,
      commandType: params.commandType,
      sequenceNumber: params.sequenceNumber,
      version: this.packetVersion,
      maxTries: params.maxTries,
    });
  }

  public async getCommandOutput(sequenceNumber: number) {
    const resp = await rawOperations.getCommandOutput({
      connection: this.connection,
      sequenceNumber,
      version: this.packetVersion,
    });

    return resp;
  }

  public async waitForCommandOutput(params: {
    sequenceNumber: rawOperations.IWaitForCommandOutputParams['sequenceNumber'];
    expectedCommandTypes: rawOperations.IWaitForCommandOutputParams['expectedCommandTypes'];
    onStatus: rawOperations.IWaitForCommandOutputParams['onStatus'];
    maxTries?: rawOperations.IWaitForCommandOutputParams['maxTries'];
    options?: rawOperations.IWaitForCommandOutputParams['options'];
  }) {
    const resp = await rawOperations.waitForCommandOutput({
      connection: this.connection,
      version: this.packetVersion,
      ...params,
    });

    return resp;
  }

  public getCommandStatus() {
    return rawOperations.getStatus({
      connection: this.connection,
      version: this.packetVersion,
    });
  }

  public async sendQuery(params: {
    data: Uint8Array;
    sequenceNumber: number;
    maxTries?: number;
  }): Promise<void> {
    if (!this.appletId) {
      throw new Error('No appletId found in SDK Core');
    }

    await operations.sendCommand({
      connection: this.connection,
      data: params.data,
      appletId: this.appletId,
      sequenceNumber: params.sequenceNumber,
      version: this.packetVersion,
      maxTries: params.maxTries,
    });
  }

  public async getResult(sequenceNumber: number) {
    if (!this.appletId) {
      throw new Error('No appletId found in SDK Core');
    }

    const resp = await operations.getCommandOutput({
      connection: this.connection,
      appletId: this.appletId,
      sequenceNumber,
      version: this.packetVersion,
    });

    return resp;
  }

  public async waitForResult(params: {
    sequenceNumber: operations.IWaitForCommandOutputParams['sequenceNumber'];
    onStatus?: operations.IWaitForCommandOutputParams['onStatus'];
    maxTries?: operations.IWaitForCommandOutputParams['maxTries'];
    options?: operations.IWaitForCommandOutputParams['options'];
  }) {
    if (!this.appletId) {
      throw new Error('No appletId found in SDK Core');
    }

    const resp = await operations.waitForCommandOutput({
      connection: this.connection,
      version: this.packetVersion,
      appletId: this.appletId,
      ...params,
    });

    return resp;
  }

  public getStatus() {
    return operations.getStatus({
      connection: this.connection,
      version: this.packetVersion,
    });
  }

  public sendBootloaderAbort() {
    return bootloaderOperations.sendBootloaderAbort(this.connection);
  }

  public sendBootloaderData(
    data: string,
    onProgress?: (progress: number) => void,
  ) {
    return bootloaderOperations.stmUpdateSendData(
      this.connection,
      data,
      onProgress,
    );
  }

  private static async getSDKVersion(connection: IDeviceConnection) {
    let retries = 0;
    const maxTries = 2;
    let firstError: Error = new DeviceCommunicationError(
      DeviceCommunicationErrorType.UNKNOWN_COMMUNICATION_ERROR,
    );

    await connection.beforeOperation();
    while (retries < maxTries) {
      try {
        await legacyOperations.sendData(
          connection,
          88,
          '00',
          PacketVersionMap.v1,
          2,
        );

        const sdkVersionData = await legacyOperations.receiveCommand(
          connection,
          [88],
          PacketVersionMap.v1,
          5000,
        );

        const sdkVersion = formatSDKVersion(sdkVersionData.data);

        const packetVersion = getPacketVersionFromSDK(sdkVersion);

        await connection.afterOperation();
        return {
          sdkVersion,
          packetVersion: packetVersion ?? PacketVersionMap.v1,
        };
      } catch (error) {
        retries += 1;
        firstError = error as Error;
      }
    }

    await connection.afterOperation();
    throw firstError;
  }
}
