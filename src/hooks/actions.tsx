'use client';
import client from "@/config/applloAuthorizedClient";
import { DELETE_TOPIC, SELECT_TOPIC } from "@/config/graphql";
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