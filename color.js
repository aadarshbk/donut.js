let A = 0, B = 0, M = Math;

const asciiframe = () => {
    let b = [], z = [];
    A += 0.05;
    B += 0.07;
    const cA = M.cos(A);
    const sA = M.sin(A);
    const cB = M.cos(B);
    const sB = M.sin(B);

    for (let k = 0; k < 1760; k++) {
        b[k] = k % 80 == 79 ? "\n" : " ";
        z[k] = 0;
    }

    for (let j = 0; j < 6.28; j += 0.07) {
        const ct = M.cos(j);
        const st = M.sin(j);

        for (let i = 0; i < 6.28; i += 0.02) {
            const sp = M.sin(i), cp = M.cos(i);
            const h = ct + 2;
            const D = 1 / (sp * h * sA + st * cA + 5);
            const t = sp * h * cA - st * sA;
            const x = (40 + 30 * D * (cp * h * cB - t * sB)) | 0;
            const y = (12 + 15 * D * (cp * h * sB + t * cB)) | 0;
            const o = x + 80 * y;
            const N = (8 * ((st * sA - sp * ct * cA) * cB - sp * ct * sA - st * cA - cp * ct * sB)) | 0;

            if (y < 22 && y >= 0 && x >= 0 && x < 79 && D > z[o]) {
                z[o] = D;
                process.stdout.write('\x1b[31m' + b[o] + '\x1b[0m');
            } else {
                process.stdout.write(b[o]);
            }
        }
    }
    process.stdout.write('\x1b[2J\x1b[H');
};

const intervalId = setInterval(asciiframe, 50);
