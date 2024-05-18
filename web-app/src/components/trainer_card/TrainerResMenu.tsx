import React from 'react';
import { Select, MenuItem, FormControl, InputLabel, SelectChangeEvent } from '@mui/material';

const generateTimeSlots = (start: number, end: number, interval: number): string[] => {
    const times: string[] = [];
    let currentTime = new Date();
    currentTime.setHours(start, 0, 0, 0);

    while (currentTime.getHours() < end || (currentTime.getHours() === end && currentTime.getMinutes() === 0)) {
        const hours = currentTime.getHours().toString().padStart(2, '0');
        const minutes = currentTime.getMinutes().toString().padStart(2, '0');
        times.push(`${hours}:${minutes}`);
        currentTime.setMinutes(currentTime.getMinutes() + interval);
    }

    return times;
};

const timeSlots = generateTimeSlots(8, 16, 30);

const TrainerResMenu: React.FC = () => {
    const [selectedTime, setSelectedTime] = React.useState<string>('');

    const handleChange = (event: SelectChangeEvent<string>) => {
        setSelectedTime(event.target.value as string);
    };

    const isDisabled = (time: string): boolean => {
        const [hours, minutes] = time.split(':').map(Number);
        const totalMinutes = hours * 60 + minutes;
        const startBusy = 9 * 60; // 9:00 AM
        const endBusy = 11 * 60; // 11:00 AM
        return totalMinutes >= startBusy && totalMinutes < endBusy;
    };


    return (
        <FormControl fullWidth variant="outlined" margin="normal">
            <InputLabel id="reservation-time-label">Select Time</InputLabel>
            <Select
                labelId="reservation-time-label"
                id="reservation-time"
                value={selectedTime}
                onChange={handleChange}
                label="Select Time"
            >
                {timeSlots.map((time) => (
                    <MenuItem key={time} value={time} disabled={isDisabled(time)}>
                        {time}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export default TrainerResMenu;
