export default function getTargetDOM(e: any) {
    let targetDom: HTMLElement = e.target.getAttribute('attr-key');
    if (targetDom) {
        return e.target;
    } else {
        targetDom = e.nativeEvent.path.find((value: any) => value.classList.contains('ant-form-item'));
        return targetDom;
    }
}