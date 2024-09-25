export interface postResponseUser {
    status: string;
    data: {
        name: string;
        mail: string;
        token: string;
    };
}

export interface AError extends Error {
    response: {
        data: {
            status: string;
            message: string;
        };
    };
}

export interface Problem {
    difficulty: string;
    name: string;
    id: string;
    _id?: string;
    submissionsCount: number;
    testCaseId?: string;
    description?: string;
}

export interface AllProblems {
    status: string;
    result: {
        problems: Problem[];
    };
}

export interface submissionsInterface {
    submissions: [
        {
            _id: string;
            problem: {
                name: string;
                id: string;
            };
            submittedAt: string;
            language: string;
            verdict: string;
        }
    ];
}

export function getTimeElapsed(dateString: string): string {
    console.log(dateString);
    const inputDate = new Date(dateString);
    const currentDate = new Date();
    const timeDifference = currentDate.getTime() - inputDate.getTime();
    const millisecondsPerMinute = 60 * 1000;
    const millisecondsPerHour = 60 * millisecondsPerMinute;
    const millisecondsPerDay = 24 * millisecondsPerHour;

    if (timeDifference < millisecondsPerMinute) {
        return "less than a minute ago";
    } else if (timeDifference < millisecondsPerHour) {
        const totalMinutes = Math.floor(timeDifference / millisecondsPerMinute);
        return `${totalMinutes} min${totalMinutes > 1 ? "s" : ""} ago`;
    } else if (timeDifference < millisecondsPerDay) {
        const totalHours = Math.floor(timeDifference / millisecondsPerHour);
        return `${totalHours}h ago`;
    } else {
        const totalDays = Math.floor(timeDifference / millisecondsPerDay);
        if (totalDays < 30) {
            return `${totalDays}d ago`;
        } else {
            const months = Math.floor(totalDays / 30);
            const remainingDays = totalDays % 30;
            if (months < 12) {
                return remainingDays === 0
                    ? `${months}m ago`
                    : `${months}m ${remainingDays}d ago`;
            } else {
                const years = Math.floor(months / 12);
                const remainingMonths = months % 12;
                if (remainingMonths === 0) {
                    return `${years}y ago`;
                } else {
                    return `${years}y ${remainingMonths}m ago`;
                }
            }
        }
    }
}
