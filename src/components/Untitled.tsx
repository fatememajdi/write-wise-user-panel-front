'use client';
import NProgress from 'nprogress';


export function StartLoader() { NProgress.start(); };
export function StopLoader() { NProgress.done(); };

export function SplitText(text: string): Promise<string> {
    let newText: any = '';
    text.split(/[\t]/gm).map((item: any) => {
        newText = newText + item + '    ';
    });
    let newText2: any = '';
    newText.split(/[\r\n]/gm).map((item: any) => {
        newText2 = newText2 + item + '<br/>';
    });

    return newText2;
};

export function CountWords(text: string): Promise<string> {

    let count: any = 0

    text.split('a').map((word: string) => {
        if (word !== 'a' && word !== 'the' && word !== 'an')
            count++;
    });
    return count;
};