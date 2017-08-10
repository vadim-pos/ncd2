/**
 * ApiEndpoints class provides API endpoints for HTTP-requests.
 */

export class ApiEndpoints {
  public static TOKEN = '/token/';
  public static GRAPH_DATA = '/internal-api/api-usage/';
  public static MAP_DATA = '/internal-api/api-usage-map/';
  public static CHART_DATA = '/internal-api/dashboard-charts/';
  public static UNMASK = '/internal-api/account/message/unmask/';
  public static CHECK_OLD_PASSWORD = '/internal-api/account/check/old-password/';
  public static CHECK_PASSWORD = '/internal-api/account/check/password/';
  public static CHECK_EMAIL = '/internal-api/account/check/email/';
  public static GET_ZIP = '/internal-api/account/check/zip/';
  public static SAMPLES = '/internal-api/id-tool-samples/';
  public static PROFILE_DATA = '/internal-api/account/';
  public static PASSWORD_RESET = '/internal-api/account/password-reset/';
  public static SET_DEFAULT = '/profile-api/billing/set-default/';
  public static BILLING_CARD = '/internal-api/billing/cards/';
  public static BILLING_BANK_ACCOUNT = '/internal-api/billing/bank-accounts/';
  public static FRAUD = '/internal-api/fraud/stats/';
  public static HELP = '/internal-api/account/message/fraud-help/';
  // public static LOGOUT = '/logout/';
  public static GET_PLATFORM_USERS = '/internal-api/platform-users/';
  public static GET_PLATFORM_ACCOUNT = '/profile-api/status-line-info/';
  public static DOCUMENTATION = '/documentation/';
}
