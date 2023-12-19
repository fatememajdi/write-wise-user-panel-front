'use client';
import client from "@/config/applloClient";
import { DELETE_TOPIC, SELECT_CURRENCY, SELECT_TOPIC, UPDATE_USER } from "@/config/graphql";
import toast from "react-hot-toast";

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
    let res: boolean = false;
    await client.mutate({
        mutation: SELECT_CURRENCY,
        fetchPolicy: "no-cache",
        variables: {
            id: id
        }
    }).then(() => {
        res = true;
    }).catch((err) => {
        toast.error(err.message);
    });
    return res;
};