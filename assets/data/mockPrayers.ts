// src/data/mockPrayers.ts

export type PrayerRequest = {
  id: string;
  name?: string;
  message: string;
  isAnonymous: boolean;
  createdAt: Date;
};

export const mockPrayers: PrayerRequest[] = [
  {
    id: 'p1',
    name: 'Grace Mensah',
    message: 'Please pray for clarity and calm during my final exams next week.',
    isAnonymous: false,
    createdAt: new Date('2025-10-07T09:30:00Z'),
  },
  {
    id: 'p2',
    name: 'Unknown', // optional, will be ignored because isAnonymous true
    message: 'Requesting healing and strength for my father who is unwell.',
    isAnonymous: true,
    createdAt: new Date('2025-10-07T18:45:00Z'),
  },
  {
    id: 'p3',
    name: 'Kofi Owusu',
    message: 'Pray that doors open for a job opportunity this month.',
    isAnonymous: false,
    createdAt: new Date('2025-10-06T12:00:00Z'),
  },
  {
    id: 'p4',
    name: 'Ama Serwaa',
    message: 'Please pray for my marriage — wisdom and patience.',
    isAnonymous: false,
    createdAt: new Date('2025-09-30T07:15:00Z'),
  },
  {
    id: 'p5',
    // no name provided and anonymous true => will display "Unknown Person"
    message: 'Pray for peace and provision for my family.',
    isAnonymous: true,
    createdAt: new Date('2025-10-08T02:20:00Z'),
  },
];

export default mockPrayers;
