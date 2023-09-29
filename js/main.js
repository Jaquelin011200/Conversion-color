const colorPicker = document.getElementById('colorPicker');
        const colorDiv = document.getElementById('colorDiv');
        const hexValue = document.getElementById('hexValue');
        const rgbValue = document.getElementById('rgbValue');
        const hslValue = document.getElementById('hslValue');
        const cmykValue = document.getElementById('cmykValue');
        const hslaValue = document.getElementById('hslaValue');
        const hwbValue = document.getElementById('hwbValue');

        colorPicker.addEventListener('input', function() {
            const selectedColor = colorPicker.value;
            colorDiv.style.backgroundColor = selectedColor;

            // Obtener el valor en formato HEX
            hexValue.value = selectedColor;

            // Convertir el valor a formato RGB
            const rgbColor = hexToRgb(selectedColor);
            rgbValue.value = `rgb(${rgbColor.r}, ${rgbColor.g}, ${rgbColor.b})`;

            // Convertir el valor a formato HSL
            const hslColor = rgbToHsl(rgbColor.r, rgbColor.g, rgbColor.b);
            hslValue.value = `hsl(${hslColor.h}, ${hslColor.s}%, ${hslColor.l}%)`;

            // Convertir el valor a formato CMYK
            const cmykColor = rgbToCmyk(rgbColor.r, rgbColor.g, rgbColor.b);
            cmykValue.value = `cmyk(${cmykColor.c}%, ${cmykColor.m}%, ${cmykColor.y}%, ${cmykColor.k}%)`;

            // Convertir el valor a formato HSLA
            const hslaColor = { ...hslColor, a: 1 }; // Agregar alfa 1 (100% opacidad)
            hslaValue.value = `hsla(${hslaColor.h}, ${hslaColor.s}%, ${hslaColor.l}%, ${hslaColor.a})`;

            // Convertir el valor a formato HWB
            const hwbColor = rgbToHwb(rgbColor.r, rgbColor.g, rgbColor.b);
            hwbValue.value = `hwb(${hwbColor.h}, ${hwbColor.w}%, ${hwbColor.b}%)`;
        });

        // Función para convertir un valor HEX a RGB
        function hexToRgb(hex) {
            const bigint = parseInt(hex.slice(1), 16);
            const r = (bigint >> 16) & 255;
            const g = (bigint >> 8) & 255;
            const b = bigint & 255;
            return { r, g, b };
        }

        // Función para convertir RGB a HSL
        function rgbToHsl(r, g, b) {
            r /= 255;
            g /= 255;
            b /= 255;
            const max = Math.max(r, g, b);
            const min = Math.min(r, g, b);
            let h, s, l;

            if (max === min) {
                h = 0;
            } else if (max === r) {
                h = ((g - b) / (max - min)) * 60;
            } else if (max === g) {
                h = (2 + (b - r) / (max - min)) * 60;
            } else {
                h = (4 + (r - g) / (max - min)) * 60;
            }

            if (h < 0) {
                h += 360;
            }

            l = (max + min) / 2;

            if (max === min) {
                s = 0;
            } else if (l <= 0.5) {
                s = (max - min) / (2 * l);
            } else {
                s = (max - min) / (2 - 2 * l);
            }

            s = Math.round(s * 100);
            l = Math.round(l * 100);

            return { h, s, l };
        }

        // Función para convertir RGB a CMYK (simulación simple)
        function rgbToCmyk(r, g, b) {
            const c = 100 - (r / 255) * 100;
            const m = 100 - (g / 255) * 100;
            const y = 100 - (b / 255) * 100;
            const k = Math.min(c, m, y);
            return { c, m, y, k };
        }

        // Función para convertir RGB a HWB
        function rgbToHwb(r, g, b) {
            const hslColor = rgbToHsl(r, g, b);
            const w = Math.round((1 - hslColor.s / 100) * hslColor.l);
            const bValue = Math.round((1 - hslColor.l / 100) * 100);
            return { h: hslColor.h, w, b: bValue };
        }