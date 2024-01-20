'use client';
import client, { loginClient } from "@/config/applloClient";
import {
    CREATE_PAYMENT_LINK, DELETE_ESSAY, DELETE_TOPIC,
    EMAIL_SIGN_IN, GET_RANDOM_WRITING, RECEIPT_LINK,
    REGENERATE_PAYMENT_LINK,
    SELECT_CURRENCY, VERIFICATION_CODE
} from "@/config/graphql";
import toast from "react-hot-toast";
import { topic } from "../../types/topic";
import { UserProfile } from "../../types/profile";

export async function DeleteTopics(id: string, UpdateTopicsList: any) {
    await client.mutate({
        mutation: DELETE_TOPIC,
        variables: {
            id: id
        }
    }).then(async (res) => {
        UpdateTopicsList(id);
    }).catch((err) => {
        toast.error(err.message);
    });
};

export async function SelectCurrency(id: string) {
    let profile: UserProfile = null;
    await client.mutate({
        mutation: SELECT_CURRENCY,
        fetchPolicy: "no-cache",
        variables: {
            id: id
        }
    }).then((res) => {
        profile = res.data.selectCurrency;
    }).catch((err) => {
        toast.error(err.message);
    });
    return profile;
};

export async function GenerateNewTopic(type: string, subType: string) {
    let topic: topic = null;
    await client.query({
        query: GET_RANDOM_WRITING,
        fetchPolicy: "no-cache",
        variables: {
            type: type,
            questionType: subType
        }
    }).then(async (res) => {
        topic = res.data.getRandomWriting;
    }).catch(async (err) => {
        toast.error(err.message);
    });
    return topic;
};

export async function DeleteEssaies(id: string) {
    let res: boolean = false;
    await client.mutate({
        mutation: DELETE_ESSAY,
        variables: {
            id: id
        }
    }).then(async () => {
        res = true;
        toast.success('Essay deleted.');
    }).catch(async (err) => {
        toast.error(err.message);
    });
    return res;
};

export async function EmaiSignIn(email: string) {
    let mail: string = null;
    await loginClient.mutate({
        mutation: EMAIL_SIGN_IN,
        variables: {
            email: email,
        },
    }).then(async (res) => {
        console.log(res);
        mail = res.data.emailLogin.email;
    }
    ).catch(async (err) => {
        toast.error(err.message);
    });
    return mail;
}

export async function VerifyCode(email: string, code: string) {
    let token: string = null;
    await loginClient.mutate({
        mutation: VERIFICATION_CODE,
        variables: {
            email: email,
            code: code
        },
    }).then(async (data) => {
        token = data.data.verifyEmail.token;
    }
    ).catch(async (err) => {
        toast.error(err.message);
    });
    return token;
};

export async function PaymentLink(quantity: number, id: string, promotionCode: string) {
    let link: string = null;
    await client.mutate({
        mutation: CREATE_PAYMENT_LINK,
        fetchPolicy: "no-cache",
        variables: {
            id: id,
            adjustedQuantity: quantity,
            promotionCode: promotionCode
        }
    }).then(async (res) => {
        link = res.data.createPaymentLink.link;
    }).catch((err) => {
        toast.error(err.message);
    });
    return link;
};

export async function Reciept(id: string) {
    let link: string = null;
    await client.query({
        query: RECEIPT_LINK,
        fetchPolicy: "no-cache",
        variables: {
            id: id
        }
    }).then(async (res) => {
        link = res.data.receiptLink.link;
    });

    return link;
};

export async function RegenaratePayment(id: string) {
    let link: string = null;
    await client.mutate({
        mutation: REGENERATE_PAYMENT_LINK,
        fetchPolicy: "no-cache",
        variables: {
            id: id
        }
    }).then(async (res) => {
        link = res.data.regeneratePaymentLink.link;
    }).catch((err) => {
        toast.error(err.message);
    });
    return link;
};