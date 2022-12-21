export async function copyTextToClipboard(text) {
    if (!navigator.clipboard) {
        return;
    }

    try {
        await navigator.clipboard.writeText(text);
        console.log('Copied to clipboard', text);
    } catch (err) {
        console.error('Failed to copy: ', err);
    }

}