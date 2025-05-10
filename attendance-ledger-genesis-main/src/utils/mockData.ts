import { Event, EventType, AttendanceStatus, Attendee, User, NFT } from './types';

// Helper to generate a random mock Ethereum address
const generateMockAddress = () => {
  let address = '0x';
  const characters = '0123456789abcdef';
  for (let i = 0; i < 40; i++) {
    address += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return address;
};

// Generate mock attendees
const generateMockAttendees = (count: number): Attendee[] => {
  const attendees: Attendee[] = [];
  const names = [
    'John Doe', 'Jane Smith', 'Alex Johnson', 'Maria Garcia', 'Wei Chen', 
    'Emma Wilson', 'Omar Hassan', 'Priya Patel', 'Carlos Rodriguez', 'Fatima Ahmed',
    'Lucas Kim', 'Sofia Nguyen', 'Raj Sharma', 'Nadia Ali', 'David Cohen',
    'Aisha Mohammed', 'Seo-Jun Park', 'Layla Ibrahim', 'Mateo Santos', 'Zara Khan'
  ];

  for (let i = 0; i < count; i++) {
    const randStatus = Math.random();
    const status = randStatus > 0.7 
      ? AttendanceStatus.PRESENT 
      : (randStatus > 0.4 ? AttendanceStatus.ABSENT : AttendanceStatus.PENDING);
      
    const checkInTime = status === AttendanceStatus.PRESENT 
      ? new Date(new Date().getTime() - Math.random() * 3600000).toISOString() 
      : undefined;
    
    attendees.push({
      id: `att-${i}`,
      name: names[Math.floor(Math.random() * names.length)],
      walletAddress: generateMockAddress(),
      status,
      checkInTime
    });
  }
  
  return attendees;
};

// Generate mock events
export const mockEvents: Event[] = [
  {
    id: 'evt-1',
    name: 'ETHGlobal Hackathon',
    description: 'A 48-hour hackathon focused on Ethereum development',
    type: EventType.HACKATHON,
    date: new Date(Date.now() + 86400000 * 7).toISOString(), // 7 days from now
    location: 'San Francisco, CA',
    totalRegistered: 85,
    totalPresent: 62,
    attendees: generateMockAttendees(85),
    organizer: generateMockAddress(),
    ipfsHash: 'QmXjkFQjnD8i8qdJu4XuWuweV4JcmoB6xo1iY1DZ4xV3qa',
    blockchainTxId: '0x3a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b'
  },
  {
    id: 'evt-2',
    name: 'Blockchain 101',
    description: 'Introduction to blockchain technology and applications',
    type: EventType.COLLEGE,
    date: new Date(Date.now() - 86400000 * 2).toISOString(), // 2 days ago
    location: 'Virtual',
    totalRegistered: 120,
    totalPresent: 95,
    attendees: generateMockAttendees(120),
    organizer: generateMockAddress(),
    ipfsHash: 'QmYjkGQjnE8i9qdKu5XuWuweK4JdmoC6xo2iZ1DZ4xV3qb',
    blockchainTxId: '0x4b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2'
  },
  {
    id: 'evt-3',
    name: 'CryptoBeats Festival',
    description: 'Music festival with NFT tickets and Web3 experiences',
    type: EventType.CONCERT,
    date: new Date(Date.now() + 86400000 * 14).toISOString(), // 14 days from now
    location: 'Miami, FL',
    totalRegistered: 250,
    totalPresent: 0,
    attendees: generateMockAttendees(250),
    organizer: generateMockAddress()
  },
  {
    id: 'evt-4',
    name: 'Smart Contract Security',
    description: 'Advanced course on securing blockchain applications',
    type: EventType.COLLEGE,
    date: new Date(Date.now() - 86400000 * 5).toISOString(), // 5 days ago
    location: 'Room 305, Computer Science Building',
    totalRegistered: 45,
    totalPresent: 39,
    attendees: generateMockAttendees(45),
    organizer: generateMockAddress(),
    ipfsHash: 'QmZjkHQjnF8i9qdLu5XuWuweV4JdmoD6xo3iY1DZ4xV3qc',
    blockchainTxId: '0x5c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3'
  },
  {
    id: 'evt-5',
    name: 'Web3 Developer Summit',
    description: 'Conference for blockchain and Web3 developers',
    type: EventType.HACKATHON,
    date: new Date(Date.now() + 86400000 * 30).toISOString(), // 30 days from now
    location: 'Berlin, Germany',
    totalRegistered: 350,
    totalPresent: 0,
    attendees: generateMockAttendees(350),
    organizer: generateMockAddress()
  }
];

// Generate mock NFTs
export const mockNFTs: NFT[] = [
  {
    id: 'nft-1',
    name: 'Perfect Attendance - Spring 2023',
    description: 'Awarded for 100% attendance in Blockchain 101',
    image: 'https://via.placeholder.com/300/6C5CE7/FFFFFF?text=100%25+Attendance',
    eventId: 'evt-2',
    earnedAt: new Date(Date.now() - 86400000).toISOString() // 1 day ago
  },
  {
    id: 'nft-2',
    name: 'ETHGlobal Hacker',
    description: 'Participated in ETHGlobal Hackathon',
    image: 'https://via.placeholder.com/300/00D2FF/FFFFFF?text=ETHGlobal',
    eventId: 'evt-1',
    earnedAt: new Date(Date.now() - 86400000 * 7).toISOString() // 7 days ago
  }
];

// Mock user
export const mockUser: User = {
  name: 'Alex Developer',
  walletAddress: '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045', // Vitalik's address :)
  isConnected: true,
  isOrganizer: true,
  events: mockEvents,
  nfts: mockNFTs
};

// Function to simulate connecting wallet
export const connectWallet = (): Promise<User> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        ...mockUser,
        isConnected: true
      });
    }, 1000);
  });
};

// Function to simulate marking attendance
export const markAttendance = (
  eventId: string, 
  attendeeId: string, 
  status: AttendanceStatus
): Promise<Event> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const event = mockEvents.find(e => e.id === eventId);
      if (event) {
        const updatedEvent = { ...event };
        const attendeeIndex = updatedEvent.attendees.findIndex(a => a.id === attendeeId);
        
        if (attendeeIndex >= 0) {
          const currentStatus = updatedEvent.attendees[attendeeIndex].status;
          updatedEvent.attendees[attendeeIndex].status = status;
          
          if (status === AttendanceStatus.PRESENT) {
            updatedEvent.attendees[attendeeIndex].checkInTime = new Date().toISOString();
            updatedEvent.totalPresent += 1;
          } else if (
            currentStatus === AttendanceStatus.PRESENT &&
            (status === AttendanceStatus.ABSENT || status === AttendanceStatus.PENDING)
          ) {
            updatedEvent.totalPresent -= 1;
          }
          
          resolve(updatedEvent);
        }
      }
      
      resolve(event!);
    }, 500);
  });
};

// Function to simulate creating an event
export const createEvent = (eventData: Partial<Event>): Promise<Event> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newEvent: Event = {
        id: `evt-${mockEvents.length + 1}`,
        name: eventData.name || 'New Event',
        description: eventData.description || 'No description provided',
        type: eventData.type || EventType.HACKATHON,
        date: eventData.date || new Date().toISOString(),
        location: eventData.location || 'Virtual',
        totalRegistered: 0,
        totalPresent: 0,
        attendees: [],
        organizer: mockUser.walletAddress
      };
      
      mockEvents.push(newEvent);
      resolve(newEvent);
    }, 1000);
  });
};

// Function to simulate publishing to blockchain
export const publishToBlockchain = (eventId: string): Promise<{ipfsHash: string, blockchainTxId: string}> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const ipfsHash = `QmX${Math.random().toString(36).substring(2, 15)}`;
      const blockchainTxId = `0x${Math.random().toString(36).substring(2, 40)}`;
      
      const eventIndex = mockEvents.findIndex(e => e.id === eventId);
      if (eventIndex >= 0) {
        mockEvents[eventIndex].ipfsHash = ipfsHash;
        mockEvents[eventIndex].blockchainTxId = blockchainTxId;
      }
      
      resolve({ ipfsHash, blockchainTxId });
    }, 2000);
  });
};

// Function to get a specific event
export const getEvent = (eventId: string): Promise<Event | undefined> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const event = mockEvents.find(e => e.id === eventId);
      resolve(event);
    }, 300);
  });
};

// Function to add an attendee to an event
export const addAttendee = (
  eventId: string,
  attendeeData: { name: string; walletAddress: string; status: AttendanceStatus }
): Promise<Event> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const eventIndex = mockEvents.findIndex(e => e.id === eventId);
      
      if (eventIndex >= 0) {
        const updatedEvent = { ...mockEvents[eventIndex] };
        
        // Create new attendee
        const newAttendee: Attendee = {
          id: `att-${updatedEvent.attendees.length + 1}-${Date.now()}`,
          name: attendeeData.name,
          walletAddress: attendeeData.walletAddress,
          status: attendeeData.status
        };
        
        // Add to attendees array
        updatedEvent.attendees = [...updatedEvent.attendees, newAttendee];
        
        // Update total registered count
        updatedEvent.totalRegistered = updatedEvent.attendees.length;
        
        // Update the event in mockEvents
        mockEvents[eventIndex] = updatedEvent;
        
        resolve(updatedEvent);
      } else {
        // Event not found, resolve with original event
        resolve(mockEvents.find(e => e.id === eventId)!);
      }
    }, 500);
  });
};

// Add to global window object for easier access
declare global {
  interface Window {
    addAttendee: typeof addAttendee;
    getEvent: typeof getEvent;
  }
}

// Expose functions to window object
if (typeof window !== 'undefined') {
  window.addAttendee = addAttendee;
  window.getEvent = getEvent;
}
