export class Message {
    public static RECORD_NOT_FOUND = 'Sorry, record not found.';

    public static INVALID_OBJECT_ID = 'Invalid Object ID.';

    public static INVALID_CREDENTIALS = 'Invalid credentials';

    public static INVALID_TOKEN = 'Invalid token';

    public static MISSING_TOKEN = 'Missing token';

    public static MISSING_VERSION =
        'Missing version number. Specify an API version in the Accept header. Accept: application/vnd.alertizen+json; version=2;';

    public static INVALID_USERNAME = 'Invalid username. Enter a valid Email or Phone Number';

    public static UNAUTHORIZED = 'Unauthorized request';

    public static ACCOUNT_CREATED = 'Account created successfully';

    public static ACCOUNT_NOT_CREATED = 'Account could not be created';

    public static EXPIRED_TOKEN = 'Sorry, your token has expired. Please login to continue.';
}
