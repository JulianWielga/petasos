import React from "react";
import {useObserver} from "mobx-react-lite";
import {useStore} from "../store/storeProvider";
import {TopicFormikValues} from "../models";
import {TopicDialog} from "./topicDialog";

export const AddTopicDialog = () => {
    const {groups, dialogs} = useStore()

    return useObserver(() => {
        const initialValues: TopicFormikValues = {
            advancedValues: {
                acknowledgement: 'LEADER', trackingEnabled: false, maxMessageSize: 10240, retentionTime: 1
            },
            topic: '', schema: '', group: groups.defaultGroup || '', description: ''
        }
        return (
            <TopicDialog initialValues={initialValues} dialog={dialogs.topic}/>
        )
    })
}

export const AddClonedTopicDialog = () => {
    const {groups, topics, dialogs} = useStore()

    return useObserver(() => {

        const initialValues: TopicFormikValues = topics.selectedTopic ? {
            advancedValues: {
                acknowledgement: topics.selectedTopic.ack,
                trackingEnabled: topics.selectedTopic.trackingEnabled,
                maxMessageSize: topics.selectedTopic.maxMessageSize,
                retentionTime: topics.selectedTopic.retentionTime.duration
            },
            topic: '',
            schema: topics.selectedTopic.schemaWithoutMetadata,
            group: groups.groupOfSelectedTopic,
            description: topics.selectedTopic.description
        } : {
            advancedValues: {
                acknowledgement: 'LEADER', trackingEnabled: false, maxMessageSize: 10240, retentionTime: 1
            },
            topic: '', schema: '', group: groups.defaultGroup || '', description: ''
        }

        return (
            <TopicDialog initialValues={initialValues} dialog={dialogs.addClonedTopic}/>
        )
    })
}