using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BusinessObjectLayer
{

	public enum TransactionTypeRules
	{
		FOREIGNCURRENCYTRANSACTIONSNOTALLOWED = 1,
		STAFFACCOUNTTRANSACTIONSNOTALLOWED = 2,
		DORMANACCOUNTTRANSACTIONSNOTALLOWED = 3,
		FIXEDDEPOSITTRANSACTIONSNOTALLOWED = 4,
		VOUCHERNOEXPECTED = 5,
		JUNIORSAVINGTRANSACTIONNOTALLOWD = 6

	}

	public enum MBanxTransactionTypes : int
	{
		CashDeposite = 1,
		CashWithdrawal = 2,
		ChequeDeposite = 3,
		FundTransfer = 4,
		CashFromVault = 5,
		CashToVault = 6,
		MINI = 7,
		BF = 8,
		BalanceInquiry = 9,
		UTIL = 10,
		CashAccountOpening = 11,
		ChequeAccountOpening = 12,
		CashWithdrawalReversal = 13,
		CashDepositeReversal = 14,
		FundTransferReversal = 15,
		CashAccountOpeningReversal = 16,
		ChequeAccountOpeningReversal = 17
	}

	public enum MbanxAccountType
	{
		Current,
		Saving
	}
	public enum OperationStatus { New = 0, Success, Reversal, Unsuccessfull, Failed, Review, Unauthorized, Processed }

	public enum DayProcessAuthorizationStatus { Success = 0, SODnotdone, DayprocessDisable, SODprocessFailed, EODCompleted, UnKnown, DBError };

	public enum MbnxTrnsctnListnerErrMapng
	{
		Success = 000,
		Error = 060,
		No_Checking_Account = 520,
		No_Savings_Account = 530,
		Transaction_Not_Permitted = 570,
		Invalid_Account = 420,
		Dormant_Account = 403,
		Closed_Account = 405,
		Inter_ccy_transaction_is = 736,
		Account_is_not_CA_SA = 222,
		Account_has_restraints = 207,
		Not_a_savings_account = 484,
		Not_a_current_account = 483,
		Transaction_Amount_Exceeds_Balance = 110,
		Invalid_Account2 = 202,
		Invalid_Amount = 201,
		Invalid_Transaction_Code = 902,
		Invalid_Deposit_type = 901,
		Invalid_Transaction = 120

	}


	public enum UserTypes
	{
		DefaultUser,
		Administrator,
		Manager,
		Officer,
		Teller,
		CRE,
		Lead,
		Campaign
	}

	public enum UserLock
	{
		UnLock = 0,
		Lock,
		LockRecovery
	}

	public enum PayIsuAPIResponseEnum
	{
		Success = 1,
		Error = 2,
		SessionExpired = 3
	}
	public enum ActiveStatusEnum
	{
		Active = 1,
		InActive =0,
		InActiveAndActive = 2
	}
	public enum MenuList
	{
		MASTERBRANCHADDEDIT,
		MAINTAINTERMINAL,
		MOBILEVENDORADDEDIT,
		MOBILEMANUFACTUREADDEDIT,
		MOBILEMANUFACTUREMODELADDEDIT,
		MOBILEDEVICEADDEDIT,
		ADDNETWORKOPERATOR,
		ADDSIM,
		VIEWPACKAGE,
		PACKAGEUSERMAINTAIN,
		VIEWTELLERLIST,
		VIEWTRANSACTIONSEARCH,
		USERADDEDITROLE,
		USERADDUSER,
		USERSEARCHUSER
	}

}
