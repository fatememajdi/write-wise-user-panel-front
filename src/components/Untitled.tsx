'use client';
import NProgress from 'nprogress';


export function StartLoader() { NProgress.start(); };
export function StopLoader() { NProgress.done(); };

export function SplitText(text: string): Promise<string> {
    let newText: any = '';
    text.split(/[\r\n]/gm).map((item: any) => {
        newText = newText + item + '<br/>';
    })
    return newText;
}