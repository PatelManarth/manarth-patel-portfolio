import { copyFile, mkdir } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';

const files = [
  {
    source: 'assets/docs/Manarth_Patel_Resume_IT_SOC.pdf',
    destination: 'public/assets/docs/Manarth_Patel_Resume_IT_SOC.pdf'
  }
];

for (const file of files) {
  const source = resolve(file.source);
  const destination = resolve(file.destination);
  await mkdir(dirname(destination), { recursive: true });
  await copyFile(source, destination);
}
