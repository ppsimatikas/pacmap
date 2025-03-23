import { Text } from '@mantine/core';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

export function TimeAgo({ date }: { date: Date | string }) {
    return <Text>{dayjs(date).fromNow()}</Text>;
}
