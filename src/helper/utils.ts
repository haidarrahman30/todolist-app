export const formatDate = (dateString: string) => {
    const options = {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
    };
    const date = new Date(dateString);
    // @ts-ignore
    return date.toLocaleTimeString('en-US', options);
};

export const formatDateForDisplay = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    }) + ' ' + formatDate(dateString);
};
