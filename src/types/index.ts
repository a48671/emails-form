export interface IEmailOption {
    value: string;
    valid: boolean;
}

export interface IEmailsFieldAPI {
    addEmail: (email: string) => void;
    getEmailsCount: () => void;
    getAllAddedEmails: () => void;
    replaceAllEmails: (emails: string[]) => void;
    subscribe: (callback: () => void) => void;
}