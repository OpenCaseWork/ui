import * as TransferAccountsActions from '../actions/transfer-accounts-action';

export interface TransferAccountState {
  //toAccounts: Array<TransferAccountInfo>;
  toLoading: boolean;
  //fromAccounts: Array<TransferAccountInfo>;
  fromLoading: boolean;
  fromLoaded: boolean;
};

export const intitialTransferAccountState: TransferAccountState = {
  //toAccounts: undefined,
  toLoading: false,
  //fromAccounts: undefined,
  fromLoading: false,
  fromLoaded: false,
};

//export const fromAccounts = (state: TransferAccountState) => state.fromAccounts;
export const fromLoading = (state: TransferAccountState) => state.fromLoading;
export const fromLoaded = (state: TransferAccountState) => state.fromLoaded;

export function reducer(state = intitialTransferAccountState, action: TransferAccountsActions.Actions): TransferAccountState {
  // console.log('transfer-reducer called with state', state);
  // console.log('transfer-reducer called with action', action);
  /*switch (action.type) {
    case TransferAccountsActions.FROM_LOAD: {
      const newState = Object.assign({}, state, {
        fromLoading: true
      });
      return newState;
    }
    case TransferAccountsActions.FROM_LOAD_SUCCESS: {
      const newState =  Object.assign({}, state, {
        fromAccounts: action.payload.dataInfo,
        fromLoading: false,
        fromLoaded: true
      });
      return newState;
    }
    default: {
      // console.log('Transfer.default state', state);
      return state;
    }
  }*/
  return state;
}
