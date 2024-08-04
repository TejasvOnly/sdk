import { ISDK } from '@cypherock/sdk-core';
import {
  assert,
  createLoggerWithPrefix,
  createStatusListener,
} from '@cypherock/sdk-utils';
import { APP_VERSION } from '../../constants/appId';
import { IWalletAuthResultResponse } from '../../proto/generated/types';
import {
  assertOrThrowInvalidResult,
  OperationHelper,
  logger as rootLogger,
} from '../../utils';
import { IAuthWalletParams, WALLET_ID_LENGTH } from './types';
import { WalletAuthStatus } from '../../proto/generated/inheritance/wallet_auth';

export * from './types';

const logger = createLoggerWithPrefix(rootLogger, 'authWallet');

export const authWallet = async (
  sdk: ISDK,
  params: IAuthWalletParams,
): Promise<IWalletAuthResultResponse> => {
  assert(
    params.walletId.length === WALLET_ID_LENGTH,
    `Wallet Id should be exactly ${WALLET_ID_LENGTH} bytes`,
  );

  await sdk.checkAppCompatibility(APP_VERSION);

  const helper = new OperationHelper({
    sdk,
    queryKey: 'walletAuth',
    resultKey: 'walletAuth',
  });

  logger.info('Started', { ...params, onEvent: undefined });
  const { forceStatusUpdate } = createStatusListener({
    enums: WalletAuthStatus,
    onEvent: params.onEvent,
    logger,
  });

  await helper.sendQuery({
    initiate: params,
  });

  const result = await helper.waitForResult();
  logger.verbose('walletAuthResponse', result);

  assertOrThrowInvalidResult(result.result);

  forceStatusUpdate(WalletAuthStatus.WALLET_AUTH_STATUS_CARD_TAPPED);

  logger.info('Completed');
  return result.result;
};