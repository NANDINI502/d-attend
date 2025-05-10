
export enum EventType {
  CONCERT = 'Concert',
  HACKATHON = 'Hackathon',
  COLLEGE = 'College Class'
}

export enum AttendanceStatus {
  PRESENT = 'Present',
  ABSENT = 'Absent',
  PENDING = 'Pending'
}

export interface Attendee {
  id: string;
  name: string;
  walletAddress: string;
  status: AttendanceStatus;
  checkInTime?: string; // ISO string
}

export interface Event {
  id: string;
  name: string;
  description: string;
  type: EventType;
  date: string; // ISO string
  location: string;
  totalRegistered: number;
  totalPresent: number;
  attendees: Attendee[];
  organizer: string; // Wallet address of organizer
  ipfsHash?: string; // Simulated IPFS hash for attendance data
  blockchainTxId?: string; // Simulated blockchain transaction ID
}

export interface User {
  name: string;
  walletAddress: string;
  isConnected: boolean;
  isOrganizer: boolean;
  events: Event[];
  nfts: NFT[];
}

export interface NFT {
  id: string;
  name: string;
  description: string;
  image: string;
  eventId: string;
  earnedAt: string; // ISO string
}
