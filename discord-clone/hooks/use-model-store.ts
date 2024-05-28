import {create} from "zustand"
import {Channel, ChannelType, Server} from "@prisma/client"

export type ModelType = "createServer" | "invite" | "editServer" | "members" | "createChannel" | 
"leaveServer" | "deleteServer" | "deleteChannel" | "editChannel" | "deleteMessage" | "messageFile";

interface ModelData {
    server?: Server;
    channel?: Channel;
    channelType?: ChannelType;
    apiUrl?: string;
    query?: Record<string, any>;
}

interface ModelStore {
    type: ModelType | null;
    data: ModelData;
    isOpen: boolean;
    onOpen: (type: ModelType, data?: ModelData) => void;
    onClose: () => void;
}

export const useModel = create<ModelStore>((set) => ({
    type: null,
    data: {},
    isOpen: false,
    onOpen: (type, data = {}) => set({ isOpen: true, type, data }),
    onClose: () => set({ type: null, isOpen: false })
}))