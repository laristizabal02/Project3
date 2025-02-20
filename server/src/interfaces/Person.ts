export interface PersonAttributes {
    person_id: number;
    last_name: string;
    first_name: string;
    middle_name?: string;
    personal_title: string;
    suffix?: string;
    nickname?: string;
    gender_id: number;
    birth_date: Date;
    comment_text?: string;
}