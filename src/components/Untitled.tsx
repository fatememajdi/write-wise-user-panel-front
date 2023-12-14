'use client';
import NProgress from 'nprogress';
import { JOBSTATUS } from '../../types/essay';


export function StartLoader() { NProgress.start(); };
export function StopLoader() { NProgress.done(); };

export function SplitText(text: string): Promise<string> {

    let newText: any = '';
    text.split(/[\t]/gm).map((item: any) => {
        newText = newText + item + '    ';
    });
    let newText2: any = '';
    newText.split(/[\n]/gm).map((item: any) => {
        newText2 = newText2 + item + '<br/>';
    });
    let newText3: any = '';
    newText2.split(/[\r]/gm).map((item: any) => {
        newText3 = newText3 + item;
    });


    return newText3;
};

export function CountWords(text: string, Words?: number) {
    var splits = text.split(/(\s+)/);
    var splits = splits.filter(item => item != 'a' && item != 'A' && item != 'an' && item != 'An' && item != 'the' && item != 'The');
    var words = splits.filter((x) => x.trim().length > 0);
    var count: any = words.length as number;

    return <div style={{ fontSize: 20, fontWeight: 500, color: Words ? count < Words ? '#DA282E' : Words === 250 && count > 300 ? '#DA282E' : Words === 150 && count > 220 ? '#DA282E' : '#28B81B' : '#2E4057' }}>
        {'Word count: ' + count}
        <br />
        <span style={{ color: '#2E4057', fontSize: 16 }}>(Excluding articles)</span>
    </div>;
};

export function CheckCountWords(text: string, Words: number) {
    var splits = text.split(/(\s+)/);
    var splits = splits.filter(item => item != 'a' && item != 'A' && item != 'an' && item != 'An' && item != 'the' && item != 'The');
    var words = splits.filter((x) => x.trim().length > 0);
    var count: any = words.length as number;

    return count <= Words;
};

export function CapitalStart(text: string) {
    return text.charAt(0).toUpperCase() + text.slice(1)
};

export function CheckStatus(status: any, type: string) {
    if (type === 'loading')
        if (status === JOBSTATUS[1] || status === JOBSTATUS[2] || status === JOBSTATUS[3])
            return true;
        else
            return false
    else
        if (status === JOBSTATUS[4])
            return true;
        else
            return false
};