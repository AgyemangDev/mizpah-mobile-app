import NotMyBlood from "../images/Notmyblood.jpeg"

export type Schedule = {
    days: string[],
    startTime: string,
    endTime: string,
}

export type Program = {
    name:string;
    image: string;
    startDate: Date;
    endDate: Date;
    schedule: Schedule[]
}

export const UpcomingProgram:Program[] = [
    {
        name: "Not My Blood",
        image:NotMyBlood,
        startDate: new Date (2025, 9,12),
        endDate: new Date (2025, 9, 31),
        schedule: [
            {
                days: ["Monday", "Tuesday", "Wednesday,", "Thursday"],
                startTime: "7PM EST",
                endTime:"8PM EST"
            },
             {
                days: ["Sunday"],
                startTime: "5PM EST",
                endTime:"6PM EST"
            }
        ]
    },
]