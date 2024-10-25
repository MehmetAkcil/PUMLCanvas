export const formatTimeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);

    const intervals = {
        year: 31536000,
        month: 2592000,
        week: 604800,
        day: 86400,
        hour: 3600,
        minute: 60
    };

    for (const [unit, seconds] of Object.entries(intervals)) {
        const diff = Math.floor(diffInSeconds / seconds);
        if (diff >= 1) {
            return diff === 1 ? `1 ${unit} ago` : `${diff} ${unit}s ago`;
        }
    }

    return 'just now';
};