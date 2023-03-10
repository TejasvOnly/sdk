import { DeviceCommunicationError } from '@cypherock/sdk-interfaces';
import { PacketVersionMap } from '../../../utils';

export const protoSendQueryTestCases = {
  constantDate: new Date('2023-03-07T09:43:48.755Z'),
  invalidArgs: [
    {
      connection: null,
      appletId: 1,
      data: new Uint8Array([2]),
      version: PacketVersionMap.v3,
      sequenceNumber: 1,
    },
    {
      appletId: null,
      data: new Uint8Array([2]),
      version: PacketVersionMap.v3,
      sequenceNumber: 1,
    },
    {
      appletId: 1,
      data: null,
      version: PacketVersionMap.v3,
      sequenceNumber: 1,
    },
    {
      appletId: 1,
      data: new Uint8Array([2]),
      version: null,
      sequenceNumber: 1,
    },
    {
      appletId: 1,
      data: new Uint8Array([2]),
      version: PacketVersionMap.v3,
      sequenceNumber: null,
    },
    {
      connection: undefined,
      appletId: 1,
      data: new Uint8Array([2]),
      version: PacketVersionMap.v3,
      sequenceNumber: 1,
    },
    {
      appletId: undefined,
      data: new Uint8Array([2]),
      version: PacketVersionMap.v3,
      sequenceNumber: 1,
    },
    {
      appletId: 1,
      data: undefined,
      version: PacketVersionMap.v3,
      sequenceNumber: 1,
    },
    {
      appletId: 1,
      data: new Uint8Array([2]),
      version: undefined,
      sequenceNumber: 1,
    },
    {
      appletId: 1,
      data: new Uint8Array([2]),
      version: PacketVersionMap.v3,
      sequenceNumber: undefined,
    },
    {
      version: PacketVersionMap.v1,
      sequenceNumber: 1,
      data: new Uint8Array([1]),
      appletId: 1,
    },
    {
      version: PacketVersionMap.v2,
      sequenceNumber: 1,
      data: new Uint8Array([1]),
      appletId: 1,
    },
    {
      version: 'invalid',
      sequenceNumber: 1,
      data: new Uint8Array([1]),
      appletId: 1,
    },
    {
      version: PacketVersionMap.v3,
      sequenceNumber: 123423,
      data: new Uint8Array([1]),
      appletId: 1,
    },
    {
      version: PacketVersionMap.v3,
      sequenceNumber: 1,
      data: new Uint8Array([1]),
      appletId: -1,
    },
  ],
  valid: [
    {
      data: new Uint8Array([
        98, 110, 1, 88, 234, 189, 103, 120, 176, 24, 231, 183, 92, 134, 213, 11,
      ]),
      appletId: 12,
      sequenceNumber: 16,
      packets: [
        new Uint8Array([
          85, 85, 161, 179, 0, 1, 0, 1, 0, 16, 2, 1, 0, 17, 254, 26, 0, 22, 0,
          0, 10, 20, 8, 12, 18, 16, 98, 110, 1, 88, 234, 189, 103, 120, 176, 24,
          231, 183, 92, 134, 213, 11,
        ]),
      ],
      ackPackets: [
        [
          new Uint8Array([
            85, 85, 235, 13, 0, 1, 0, 1, 0, 1, 3, 1, 0, 5, 229, 0,
          ]),
          new Uint8Array([
            85, 85, 235, 13, 0, 1, 0, 1, 0, 1, 3, 1, 0, 5, 229, 0,
          ]),
          new Uint8Array([
            85, 85, 235, 13, 0, 1, 0, 1, 0, 1, 3, 1, 0, 5, 229, 0,
          ]),
          new Uint8Array([
            85, 85, 235, 13, 0, 1, 0, 1, 0, 1, 3, 1, 0, 5, 229, 0,
          ]),
          new Uint8Array([
            85, 85, 235, 13, 0, 1, 0, 1, 0, 1, 3, 1, 0, 5, 229, 0,
          ]),
          new Uint8Array([
            85, 85, 233, 246, 0, 1, 0, 1, 0, 16, 5, 1, 0, 5, 229, 0,
          ]),
        ],
      ],
      version: PacketVersionMap.v3,
    },
    {
      data: new Uint8Array([
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
      appletId: 561,
      sequenceNumber: 212,
      packets: [
        new Uint8Array([
          85, 85, 122, 214, 0, 1, 0, 6, 0, 212, 2, 1, 0, 17, 254, 48, 1, 24, 0,
          0, 10, 149, 2, 8, 177, 4, 18, 143, 2, 211, 95, 208, 246, 195, 233,
          125, 125, 142, 158, 16, 49, 166, 64, 71, 223, 4, 39, 173, 223, 87,
          209, 132, 137, 44, 179, 100, 203, 81, 235, 220, 61, 62, 106, 88,
        ]),
        new Uint8Array([
          85, 85, 64, 20, 0, 2, 0, 6, 0, 212, 2, 1, 0, 17, 254, 48, 81, 29, 188,
          137, 250, 150, 12, 134, 7, 119, 192, 45, 158, 57, 44, 81, 36, 73, 204,
          79, 75, 101, 95, 157, 180, 177, 87, 23, 142, 108, 93, 18, 185, 58, 91,
          184, 25, 87, 192, 249, 160, 189, 105, 130, 218, 154, 74, 90,
        ]),
        new Uint8Array([
          85, 85, 66, 31, 0, 3, 0, 6, 0, 212, 2, 1, 0, 17, 254, 48, 194, 245,
          71, 135, 86, 119, 50, 236, 167, 96, 202, 83, 159, 181, 98, 249, 98,
          16, 216, 144, 191, 214, 50, 191, 47, 103, 40, 168, 247, 104, 151, 174,
          66, 209, 232, 44, 220, 106, 230, 73, 173, 233, 137, 41, 152, 156, 158,
          199,
        ]),
        new Uint8Array([
          85, 85, 198, 172, 0, 4, 0, 6, 0, 212, 2, 1, 0, 17, 254, 48, 236, 106,
          209, 247, 180, 11, 121, 166, 192, 244, 5, 195, 18, 58, 236, 199, 197,
          52, 253, 112, 160, 231, 221, 6, 28, 23, 126, 132, 183, 118, 224, 165,
          46, 10, 93, 113, 156, 83, 11, 83, 145, 228, 195, 36, 199, 238, 189,
          234,
        ]),
        new Uint8Array([
          85, 85, 198, 205, 0, 5, 0, 6, 0, 212, 2, 1, 0, 17, 254, 48, 21, 12,
          157, 19, 127, 207, 47, 43, 250, 19, 210, 89, 44, 116, 120, 118, 36,
          199, 250, 250, 49, 212, 90, 182, 122, 1, 206, 182, 188, 180, 140, 3,
          72, 78, 40, 188, 235, 112, 51, 0, 7, 170, 110, 35, 93, 70, 0, 125,
        ]),
        new Uint8Array([
          85, 85, 153, 16, 0, 6, 0, 6, 0, 212, 2, 1, 0, 17, 254, 44, 96, 81, 97,
          134, 132, 242, 83, 126, 178, 177, 226, 128, 174, 58, 190, 248, 76,
          114, 215, 123, 212, 35, 245, 116, 31, 169, 152, 200, 83, 42, 217, 224,
          209, 101, 193, 3, 237, 139, 234, 48, 247, 97, 94, 131,
        ]),
      ],
      ackPackets: [
        [
          new Uint8Array([
            85, 85, 179, 12, 0, 1, 0, 1, 0, 212, 5, 1, 0, 18, 116, 0,
          ]),
        ],
        [
          new Uint8Array([
            85, 85, 179, 12, 0, 1, 0, 1, 0, 212, 5, 1, 0, 18, 116, 0,
          ]),
        ],
        [
          new Uint8Array([
            85, 85, 179, 12, 0, 1, 0, 1, 0, 212, 5, 1, 0, 18, 116, 0,
          ]),
        ],
        [
          new Uint8Array([
            85, 85, 235, 13, 0, 1, 0, 1, 0, 1, 3, 1, 0, 5, 229, 0,
          ]),
          new Uint8Array([
            85, 85, 179, 12, 0, 1, 0, 1, 0, 212, 5, 1, 0, 18, 116, 0,
          ]),
        ],
        [
          new Uint8Array([
            85, 85, 179, 12, 0, 1, 0, 1, 0, 212, 5, 1, 0, 18, 116, 0,
          ]),
        ],
        [
          new Uint8Array([
            85, 85, 233, 246, 0, 1, 0, 1, 0, 16, 5, 1, 0, 5, 229, 0,
          ]),
          new Uint8Array([
            85, 85, 179, 12, 0, 1, 0, 1, 0, 212, 5, 1, 0, 18, 116, 0,
          ]),
        ],
      ],
      version: PacketVersionMap.v3,
    },
  ],
  error: [
    // Invalid crc
    {
      data: new Uint8Array([
        98, 110, 1, 88, 234, 189, 103, 120, 176, 24, 231, 183, 92, 134, 213, 11,
      ]),
      appletId: 12,
      sequenceNumber: 16,
      packets: [
        new Uint8Array([
          85, 85, 161, 179, 0, 1, 0, 1, 0, 16, 2, 1, 0, 17, 254, 26, 0, 22, 0,
          0, 10, 20, 8, 12, 18, 16, 98, 110, 1, 88, 234, 189, 103, 120, 176, 24,
          231, 183, 92, 134, 213, 11,
        ]),
      ],
      ackPackets: [
        [
          new Uint8Array([
            85, 85, 200, 246, 0, 1, 0, 1, 0, 16, 5, 1, 0, 5, 229, 0,
          ]),
        ],
      ],
      version: PacketVersionMap.v3,
      errorInstance: DeviceCommunicationError,
    },
    // Invalid sequenceNumber
    {
      data: new Uint8Array([
        98, 110, 1, 88, 234, 189, 103, 120, 176, 24, 231, 183, 92, 134, 213, 11,
      ]),
      appletId: 12,
      sequenceNumber: 16,
      packets: [
        new Uint8Array([
          85, 85, 161, 179, 0, 1, 0, 1, 0, 16, 2, 1, 0, 17, 254, 26, 0, 22, 0,
          0, 10, 20, 8, 12, 18, 16, 98, 110, 1, 88, 234, 189, 103, 120, 176, 24,
          231, 183, 92, 134, 213, 11,
        ]),
      ],
      ackPackets: [
        [
          new Uint8Array([
            85, 85, 179, 12, 0, 1, 0, 1, 0, 212, 5, 1, 0, 18, 116, 0,
          ]),
        ],
      ],
      version: PacketVersionMap.v3,
      errorInstance: DeviceCommunicationError,
    },
  ],
};
