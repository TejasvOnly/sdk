import {
  DeviceAppError,
  DeviceCommunicationError,
} from '@cypherock/sdk-interfaces';
import { PacketVersionMap } from '../../../utils';

export const rawWaitForResultTestCases = {
  constantDate: new Date('2023-03-07T09:43:48.755Z'),
  invalidArgs: [
    {
      connection: null,
      version: PacketVersionMap.v3,
      appletId: 1,
      sequenceNumber: 1,
    },
    {
      appletId: null,
      version: PacketVersionMap.v3,
      sequenceNumber: 1,
    },
    {
      version: null,
      appletId: 1,
      sequenceNumber: 1,
    },
    {
      version: PacketVersionMap.v3,
      appletId: 1,
      sequenceNumber: null,
    },
    {
      connection: undefined,
      appletId: 1,
      version: PacketVersionMap.v3,
      sequenceNumber: 1,
    },
    {
      version: undefined,
      appletId: 1,
      sequenceNumber: 1,
    },
    {
      version: PacketVersionMap.v3,
      appletId: 1,
      sequenceNumber: undefined,
    },
    {
      appletId: undefined,
      version: PacketVersionMap.v3,
      sequenceNumber: 1,
    },
    {
      version: PacketVersionMap.v1,
      appletId: 1,
      sequenceNumber: 1,
    },
    {
      version: PacketVersionMap.v2,
      appletId: 1,
      sequenceNumber: 1,
    },
    {
      version: 'invalid',
      appletId: 1,
      sequenceNumber: 1,
    },
    {
      version: PacketVersionMap.v3,
      appletId: 1,
      sequenceNumber: 123423,
    },
    {
      version: PacketVersionMap.v3,
      appletId: -1,
      sequenceNumber: 1,
    },
  ],
  valid: [
    {
      result: new Uint8Array([
        98, 110, 1, 88, 234, 189, 103, 120, 176, 24, 231, 183, 92, 134, 213, 11,
      ]),
      appletId: 12,
      sequenceNumber: 16,
      packets: [
        new Uint8Array([
          85, 85, 193, 89, 0, 1, 0, 1, 0, 16, 3, 1, 0, 17, 254, 6, 0, 0, 0, 2,
          0, 1,
        ]),
      ],
      outputPackets: [
        [
          new Uint8Array([
            85, 85, 212, 138, 0, 1, 0, 1, 0, 16, 6, 1, 0, 17, 254, 26, 0, 22, 0,
            0, 10, 20, 8, 12, 18, 16, 98, 110, 1, 88, 234, 189, 103, 120, 176,
            24, 231, 183, 92, 134, 213, 11,
          ]),
        ],
      ],
      statusPackets: [
        [
          new Uint8Array([
            85, 85, 131, 161, 0, 1, 0, 1, 255, 255, 4, 1, 0, 17, 254, 14, 0, 10,
            0, 0, 16, 2, 24, 1, 32, 16, 40, 12, 48, 4,
          ]),
        ],
        [
          new Uint8Array([
            85, 85, 147, 128, 0, 1, 0, 1, 255, 255, 4, 1, 0, 17, 254, 14, 0, 10,
            0, 0, 16, 2, 24, 1, 32, 16, 40, 12, 48, 5,
          ]),
        ],
        [
          new Uint8Array([
            85, 85, 163, 227, 0, 1, 0, 1, 255, 255, 4, 1, 0, 17, 254, 14, 0, 10,
            0, 0, 16, 2, 24, 1, 32, 16, 40, 12, 48, 6,
          ]),
        ],
      ],
      statusList: [
        {
          deviceIdleState: 2,
          deviceWaitingOn: 0,
          abortDisabled: true,
          currentCmdSeq: 16,
          cmdState: 12,
          flowStatus: 4,
        },
        {
          deviceIdleState: 2,
          deviceWaitingOn: 0,
          abortDisabled: true,
          currentCmdSeq: 16,
          cmdState: 12,
          flowStatus: 5,
        },
        {
          deviceIdleState: 2,
          deviceWaitingOn: 0,
          abortDisabled: true,
          currentCmdSeq: 16,
          cmdState: 12,
          flowStatus: 6,
        },
      ],
      version: PacketVersionMap.v3,
    },
    {
      result: new Uint8Array([
        211, 95, 208, 246, 195, 233, 125, 125, 142, 158, 16, 49, 166, 64, 71,
        223, 4, 39, 173, 223, 87, 209, 132, 137, 44, 179, 100, 203, 81, 235,
        220, 61, 62, 106, 88, 81, 29, 188, 137, 250, 150, 12, 134, 7, 119, 192,
        45, 158, 57, 44, 81, 36, 73, 204, 79, 75, 101, 95, 157, 180, 177, 87,
        23, 142, 108, 93, 18, 185, 58, 91, 184, 25, 87, 192, 249, 160, 189, 105,
        130, 218, 154, 74, 90, 194, 245, 71, 135, 86, 119, 50, 236, 167, 96,
        202, 83, 159, 181, 98, 249, 98, 16, 216, 144, 191, 214, 50, 191, 47,
        103, 40, 168, 247, 104, 151, 174, 66, 209, 232, 44, 220, 106, 230, 73,
        173, 233, 137, 41, 152, 156, 158, 199, 236, 106, 209, 247, 180, 11, 121,
        166, 192, 244, 5, 195, 18, 58, 236, 199, 197, 52, 253, 112, 160, 231,
        221, 6, 28, 23, 126, 132, 183, 118, 224, 165, 46, 10, 93, 113, 156, 83,
        11, 83, 145, 228, 195, 36, 199, 238, 189, 234, 21, 12, 157, 19, 127,
        207, 47, 43, 250, 19, 210, 89, 44, 116, 120, 118, 36, 199, 250, 250, 49,
        212, 90, 182, 122, 1, 206, 182, 188, 180, 140, 3, 72, 78, 40, 188, 235,
        112, 51, 0, 7, 170, 110, 35, 93, 70, 0, 125, 96, 81, 97, 134, 132, 242,
        83, 126, 178, 177, 226, 128, 174, 58, 190, 248, 76, 114, 215, 123, 212,
        35, 245, 116, 31, 169, 152, 200, 83, 42, 217, 224, 209, 101, 193, 3,
        237, 139, 234, 48, 247, 97, 94, 131,
      ]),
      sequenceNumber: 212,
      appletId: 124,
      packets: [
        new Uint8Array([
          85, 85, 43, 132, 0, 1, 0, 1, 0, 212, 3, 1, 0, 17, 254, 6, 0, 0, 0, 2,
          0, 1,
        ]),
        new Uint8Array([
          85, 85, 27, 231, 0, 1, 0, 1, 0, 212, 3, 1, 0, 17, 254, 6, 0, 0, 0, 2,
          0, 2,
        ]),
        new Uint8Array([
          85, 85, 11, 198, 0, 1, 0, 1, 0, 212, 3, 1, 0, 17, 254, 6, 0, 0, 0, 2,
          0, 3,
        ]),
        new Uint8Array([
          85, 85, 123, 33, 0, 1, 0, 1, 0, 212, 3, 1, 0, 17, 254, 6, 0, 0, 0, 2,
          0, 4,
        ]),
        new Uint8Array([
          85, 85, 107, 0, 0, 1, 0, 1, 0, 212, 3, 1, 0, 17, 254, 6, 0, 0, 0, 2,
          0, 5,
        ]),
        new Uint8Array([
          85, 85, 91, 99, 0, 1, 0, 1, 0, 212, 3, 1, 0, 17, 254, 6, 0, 0, 0, 2,
          0, 6,
        ]),
      ],
      outputPackets: [
        [
          new Uint8Array([
            85, 85, 174, 10, 0, 1, 0, 6, 0, 212, 6, 1, 0, 17, 254, 48, 1, 23, 0,
            0, 10, 148, 2, 8, 124, 18, 143, 2, 211, 95, 208, 246, 195, 233, 125,
            125, 142, 158, 16, 49, 166, 64, 71, 223, 4, 39, 173, 223, 87, 209,
            132, 137, 44, 179, 100, 203, 81, 235, 220, 61, 62, 106, 88, 81,
          ]),
        ],
        [
          new Uint8Array([
            85, 85, 221, 15, 0, 2, 0, 6, 0, 212, 6, 1, 0, 17, 254, 48, 29, 188,
            137, 250, 150, 12, 134, 7, 119, 192, 45, 158, 57, 44, 81, 36, 73,
            204, 79, 75, 101, 95, 157, 180, 177, 87, 23, 142, 108, 93, 18, 185,
            58, 91, 184, 25, 87, 192, 249, 160, 189, 105, 130, 218, 154, 74, 90,
            194,
          ]),
        ],
        [
          new Uint8Array([
            85, 85, 148, 109, 0, 3, 0, 6, 0, 212, 6, 1, 0, 17, 254, 48, 245, 71,
            135, 86, 119, 50, 236, 167, 96, 202, 83, 159, 181, 98, 249, 98, 16,
            216, 144, 191, 214, 50, 191, 47, 103, 40, 168, 247, 104, 151, 174,
            66, 209, 232, 44, 220, 106, 230, 73, 173, 233, 137, 41, 152, 156,
            158, 199, 236,
          ]),
        ],
        [
          new Uint8Array([
            85, 85, 24, 200, 0, 4, 0, 6, 0, 212, 6, 1, 0, 17, 254, 48, 106, 209,
            247, 180, 11, 121, 166, 192, 244, 5, 195, 18, 58, 236, 199, 197, 52,
            253, 112, 160, 231, 221, 6, 28, 23, 126, 132, 183, 118, 224, 165,
            46, 10, 93, 113, 156, 83, 11, 83, 145, 228, 195, 36, 199, 238, 189,
            234, 21,
          ]),
        ],
        [
          new Uint8Array([
            85, 85, 99, 193, 0, 5, 0, 6, 0, 212, 6, 1, 0, 17, 254, 48, 12, 157,
            19, 127, 207, 47, 43, 250, 19, 210, 89, 44, 116, 120, 118, 36, 199,
            250, 250, 49, 212, 90, 182, 122, 1, 206, 182, 188, 180, 140, 3, 72,
            78, 40, 188, 235, 112, 51, 0, 7, 170, 110, 35, 93, 70, 0, 125, 96,
          ]),
        ],
        [
          new Uint8Array([
            85, 85, 93, 190, 0, 6, 0, 6, 0, 212, 6, 1, 0, 17, 254, 43, 81, 97,
            134, 132, 242, 83, 126, 178, 177, 226, 128, 174, 58, 190, 248, 76,
            114, 215, 123, 212, 35, 245, 116, 31, 169, 152, 200, 83, 42, 217,
            224, 209, 101, 193, 3, 237, 139, 234, 48, 247, 97, 94, 131,
          ]),
        ],
      ],
      statusPackets: [
        [
          new Uint8Array([
            85, 85, 215, 81, 0, 1, 0, 1, 255, 255, 4, 1, 0, 17, 254, 15, 0, 11,
            0, 0, 16, 2, 24, 1, 32, 212, 1, 40, 124, 48, 4,
          ]),
        ],
        [
          new Uint8Array([
            85, 85, 6, 252, 0, 1, 0, 1, 255, 255, 4, 1, 0, 17, 254, 15, 0, 11,
            0, 0, 16, 2, 24, 1, 32, 212, 1, 40, 124, 48, 9,
          ]),
        ],
        [
          new Uint8Array([
            85, 85, 165, 166, 0, 1, 0, 1, 255, 255, 4, 1, 0, 17, 254, 15, 0, 11,
            0, 0, 16, 2, 24, 1, 32, 212, 1, 40, 124, 48, 18,
          ]),
        ],
      ],
      statusList: [
        {
          deviceIdleState: 2,
          deviceWaitingOn: 0,
          abortDisabled: true,
          currentCmdSeq: 212,
          cmdState: 124,
          flowStatus: 4,
        },
        {
          deviceIdleState: 2,
          deviceWaitingOn: 0,
          abortDisabled: true,
          currentCmdSeq: 212,
          cmdState: 124,
          flowStatus: 9,
        },
        {
          deviceIdleState: 2,
          deviceWaitingOn: 0,
          abortDisabled: true,
          currentCmdSeq: 212,
          cmdState: 124,
          flowStatus: 18,
        },
      ],
      version: PacketVersionMap.v3,
    },
  ],
  error: [
    // Invalid crc
    {
      appletId: 12,
      sequenceNumber: 16,
      packets: [
        new Uint8Array([
          85, 85, 193, 89, 0, 1, 0, 1, 0, 16, 3, 1, 0, 17, 254, 6, 0, 0, 0, 2,
          0, 1,
        ]),
      ],
      outputPackets: [
        [
          new Uint8Array([
            85, 85, 100, 192, 0, 1, 0, 1, 0, 16, 6, 1, 0, 18, 139, 24, 0, 0, 0,
            20, 0, 0, 0, 12, 98, 110, 1, 88, 234, 189, 103, 120, 176, 24, 231,
            183, 92, 134, 213, 11,
          ]),
        ],
      ],
      statusPackets: [],
      statusList: [],
      version: PacketVersionMap.v3,
      errorInstance: DeviceCommunicationError,
    },
    // Invalid sequenceNumber
    {
      appletId: 215,
      sequenceNumber: 215,
      packets: [
        new Uint8Array([
          85, 85, 228, 33, 0, 1, 0, 1, 0, 215, 3, 1, 0, 17, 254, 6, 0, 0, 0, 2,
          0, 1,
        ]),
      ],
      outputPackets: [
        [
          new Uint8Array([
            85, 85, 178, 91, 0, 1, 0, 1, 0, 200, 4, 1, 0, 18, 146, 11, 0, 0, 0,
            7, 3, 0, 0, 200, 1, 0, 164,
          ]),
        ],
      ],
      statusPackets: [],
      statusList: [],
      version: PacketVersionMap.v3,
      errorInstance: DeviceAppError,
    },
    // Invalid appletId
    {
      appletId: 215,
      sequenceNumber: 215,
      packets: [
        new Uint8Array([
          85, 85, 228, 33, 0, 1, 0, 1, 0, 215, 3, 1, 0, 17, 254, 6, 0, 0, 0, 2,
          0, 1,
        ]),
      ],
      outputPackets: [
        [
          new Uint8Array([
            85, 85, 224, 254, 0, 1, 0, 1, 0, 215, 6, 1, 0, 17, 254, 26, 0, 22,
            0, 0, 10, 20, 8, 12, 18, 16, 98, 110, 1, 88, 234, 189, 103, 120,
            176, 24, 231, 183, 92, 134, 213, 11,
          ]),
        ],
      ],
      statusPackets: [],
      statusList: [],
      version: PacketVersionMap.v3,
      errorInstance: DeviceAppError,
    },
  ],
};
