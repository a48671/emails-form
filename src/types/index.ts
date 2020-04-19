export interface IEmailOption {
    value: string;
    valid: boolean;
}

export interface IEmailsFieldAPI {
    addRandomMail: () => void;
    getEmailsCount: () => void;
    getAllAddedEmails: () => void;
    replaceAllEmails: (emails: string[]) => void;
    subscribe: (callback: () => void) => void;
}