/**
 * Launch file's download
 * @param {ArrayBuffer} file 
 * @param {string} filename 
 */
const downloadFile = (file, filename) => {
    const a = document.createElement('a');
    a.href = window.URL.createObjectURL(new Blob([file]));
    a.download = filename;
    a.click();
}

export default downloadFile;