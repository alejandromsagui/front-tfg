import { defineStore } from "pinia";
import { instance_axios } from "../middlewares/axios";

export const conversationStore = defineStore({
    id: 'conversation',

    state: () => ({
        members: [],
        message: ''

    }),

    actions: {
        async getConversations(id) {
            try {
                const response = await instance_axios.get(`/getConversation/${id}`);
                const conversations = response.data;

                const myId = '6474d30821acdc51af833faa'; // Reemplazar con tu propio ID
                const otherMembersIdsSet = new Set();

                conversations.forEach(conversation => {
                    conversation.members.forEach(memberId => {
                        if (memberId !== myId) {
                            otherMembersIdsSet.add(memberId);
                        }
                    });
                });

                const otherMembersIds = Array.from(otherMembersIdsSet);
                console.log('Other Members IDs:', otherMembersIds);

                const otherMembers = await Promise.all(otherMembersIds.map(memberId =>
                    this.getUserById(memberId)
                ));

                console.log('Other Members:', otherMembers);

                return conversations;
            } catch (error) {
                console.log(error);
            }
        },



        async getUserById(id) {
            try {
                const response = await instance_axios.get(`/getUser/${id}`);
                const user = response.data;
                return user;
            } catch (error) {
                console.log(error);
            }
        },

        async getMessage(id){
            try {
                const response = await instance_axios.get(`/getMessage/${id}`)
                console.log('Response store: ', response.data[0].text);
                this.message = response.data.text
            } catch (error) {
                console.log(error);
            }
        }


    }
})