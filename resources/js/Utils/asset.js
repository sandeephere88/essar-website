/**
 * Returns a properly prefixed URL for static assets or storage files,
 * ensuring compatibility with subdirectory deployments like /corvia.
 */
export function assetUrl(path) {
    if (!path) return '';
    if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('data:')) {
        return path;
    }

    // Determine base path if app is served from a subfolder like /corvia
    let basePath = '';
    if (typeof window !== 'undefined' && window.location.pathname.startsWith('/essar')) {
        basePath = '/essar';
    }

    const cleanPath = path.startsWith('/') ? path : `/${path}`;

    if (basePath && cleanPath.startsWith(basePath)) {
        return cleanPath;
    }

    return `${basePath}${cleanPath}`;
}

export function storageUrl(path) {
    if (!path) return '';
    if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('data:')) {
        return path;
    }
    const clean = path.startsWith('/') ? path.substring(1) : path;
    if (clean.startsWith('storage/')) {
        return assetUrl(`/${clean}`);
    }
    return assetUrl(`/storage/${clean}`);
}
