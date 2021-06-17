import type { HelixEventSubSubscription } from 'twitch';
import { rtfm } from 'twitch-common';
import type { EventSubChannelPollEndEventData } from '../Events/EventSubChannelPollEndEvent';
import { EventSubChannelPollEndEvent } from '../Events/EventSubChannelPollEndEvent';
import type { EventSubBase } from '../EventSubBase';
import { EventSubSubscription } from './EventSubSubscription';

/**
 * @private
 */
@rtfm('twitch-eventsub', 'EventSubSubscription')
export class EventSubChannelPollEndSubscription extends EventSubSubscription<EventSubChannelPollEndEvent> {
	constructor(
		handler: (data: EventSubChannelPollEndEvent) => void,
		client: EventSubBase,
		private readonly _userId: string
	) {
		super(handler, client);
	}

	get id(): string {
		return `channel.poll.end.${this._userId}`;
	}

	protected transformData(data: EventSubChannelPollEndEventData): EventSubChannelPollEndEvent {
		return new EventSubChannelPollEndEvent(data, this._client._apiClient);
	}

	protected async _subscribe(): Promise<HelixEventSubSubscription> {
		return this._client._apiClient.helix.eventSub.subscribeToChannelPollEndEvents(
			this._userId,
			await this._getTransportOptions()
		);
	}
}
