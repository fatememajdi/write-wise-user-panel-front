'use client';
import client from "@/config/applloClient";
import { GET_PROFILE, GET_USER_ESSAY, GET_USER_TOPICS, SCORE_ESSAY, SEARCH_COUNTRIES } from "@/config/graphql";
import { Essay } from "../../types/essay";
import { Topic } from "../../types/topic";
import { Country, UserProfile } from "../../types/profile";
import toast from "react-hot-toast";

export async function GetEsseies(id: string, page: number) {
    let essaies: Essay[] = [];
    await client.query({
        query: GET_USER_ESSAY,
        variables: {
            id: id,
            page: page / 10 + 1,
            pageSize: 10
        },
        fetchPolicy: "no-cache"
    }).then(async (res) => {
        essaies = res.data.getUserEssay.essaies;
    });
    return essaies;

};

export async function GetTopics(type: string, page: number) {
    let topics: Topic[] = []
    await client.query({
        query: GET_USER_TOPICS,
        variables: {
            type: type,
            page: page / 10 + 1,
            pageSize: 10
        },
        fetchPolicy: "no-cache"
    }).then(async (res) => {
        topics = res.data.getUserTopics.userTopics;
    })
    return topics;
};

export async function GetUserProfile() {
    let profile: UserProfile
    await client.query({
        query: GET_PROFILE,
        fetchPolicy: "no-cache"
    }).then(async (res) => {
        profile = res.data.getUserProfile;
    })
    return profile;
};

export async function GetScore(id: string, test: boolean) {
    client.mutate({
        mutation: SCORE_ESSAY,
        variables: {
            id: id,
            test: test
        }
    }).then(async () => {
        return;
    }).catch((err) => {
        toast.error(err.message);
    })
};

export async function GetCountries(Filter: string) {
    let countries: Country[] = [];

    await client.query({
        query: SEARCH_COUNTRIES,
        fetchPolicy: "no-cache",
        variables: {
            page: 1,
            pageSize: 250,
            value: Filter
        }
    }).then((res) => {
        countries = res.data.searchCountry.countries;
    }).catch((err) => {
        toast.error(err.message);
    });
    return countries;
}