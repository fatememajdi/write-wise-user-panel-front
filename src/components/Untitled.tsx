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

export function CountWords(text: string, message: boolean) {
    var splits = text.split(/(\s+)/);
    var splits = splits.filter(item => item != 'a' && item != 'A' && item != 'an' && item != 'An' && item != 'the' && item != 'The');
    var words = splits.filter((x) => x.trim().length > 0);
    var count: any = words.length as number;

    return <div style={{ fontSize: 20, fontWeight: 500, color: count < 100 ? '#DA282E' : count < 150 ? '#BCA434' : count < 200 ? '#28B81B' : '#DA282E' }}>
        {'you have written ' + count + ' words'}
        {/* {
            message ?
                count < 100 ? ' words error' : count < 150 ? ' words warning' : count < 200 ? ' words success' : ' words error'
                :
                ' words'
        } */}
    </div>;
};