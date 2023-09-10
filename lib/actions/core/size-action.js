export function $size(widthOrCallback, height) {
    return {
        name: "size",
        noAnimate: true,
        widthOrCallback,
        height,

        action(visuals) {
            if (typeof widthOrCallback === "function") {
                const callback = widthOrCallback;
                /* width is a callback that is being used to set the size */
                visuals.shapeNodes.forEach((v, index) => {
                    const [_width, _height] = callback(index, v);
                    v.$width(_width);
                    v.$height(_height);
                });
                return
            }

            visuals.shapeNodes.forEach(v => {
                v.$width(this.widthOrCallback);
                v.$height(this.height);
            });
        }
    }
}