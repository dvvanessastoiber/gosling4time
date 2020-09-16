import { Track, SingleTrack, IsSuperposedTrack, SuperposedTrack } from '../../core/gemini.schema';
import assign from 'lodash/assign';

/**
 * Resolve superposed tracks into multiple track specifications.
 */
export function resolveSuperposedTracks(track: Track): SingleTrack[] {
    if (!IsSuperposedTrack(track)) {
        // no `superpose` to resolve
        return [track];
    }

    const base: SingleTrack = JSON.parse(JSON.stringify(track));
    delete (base as SuperposedTrack).superpose; // remove `superpose`

    const resolved: SingleTrack[] = [];
    track.superpose.forEach(subSpec => {
        resolved.push(assign(JSON.parse(JSON.stringify(base)), subSpec));
    });

    return resolved;
}
