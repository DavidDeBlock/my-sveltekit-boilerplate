// lib/server/storage.ts
import fs from 'fs/promises';
import path from 'path';

export async function uploadAvatar(file: File): Promise<string> {
    const fileName = `${crypto.randomUUID()}-${file.name}`;
    const avatarDir = 'static/avatars';
    const filePath = path.join(avatarDir, fileName);
    
    // Ensure avatars directory exists
    await fs.mkdir(avatarDir, { recursive: true });
    
    // Write file to disk
    const arrayBuffer = await file.arrayBuffer();
    await fs.writeFile(filePath, Buffer.from(arrayBuffer));

    // Return public URL
    return `/avatars/${fileName}`;
}