/**
 * @file html-track-element-list.js
 */

import * as browser from '../utils/browser.js';
import document from 'global/document';

class HtmlTrackElementList {
  constructor(trackElements = []) {
    let list = this; // eslint-disable-line

    if (browser.IS_IE8) {
      list = document.createElement('custom');

      for (const prop in HtmlTrackElementList.prototype) {
        if (prop !== 'constructor') {
          list[prop] = HtmlTrackElementList.prototype[prop];
        }
      }
    }

    list.trackElements_ = [];

    Object.defineProperty(list, 'length', {
      get() {
        return this.trackElements_.length;
      }
    });

    for (let i = 0, length = trackElements.length; i < length; i++) {
      list.addTrackElement_(trackElements[i]);
    }

    if (browser.IS_IE8) {
      return list;
    }
  }

  addTrackElement_(trackElement) {
    const index = this.trackElements_.length;

    if (!('' + index in this)) {
      Object.defineProperty(this, index, {
        get() {
          return this.trackElements_[index];
        }
      });
    }

    // Do not add duplicate elements
    if (this.trackElements_.indexOf(trackElement) === -1) {
      this.trackElements_.push(trackElement);
    }
  }

  getTrackElementByTrack_(track) {
    let trackElement_;

    for (let i = 0, length = this.trackElements_.length; i < length; i++) {
      if (track === this.trackElements_[i].track) {
        trackElement_ = this.trackElements_[i];

        break;
      }
    }

    return trackElement_;
  }

  removeTrackElement_(trackElement) {
    for (let i = 0, length = this.trackElements_.length; i < length; i++) {
      if (trackElement === this.trackElements_[i]) {
        this.trackElements_.splice(i, 1);

        break;
      }
    }
  }
}

export default HtmlTrackElementList;
