'use strict';

// MODULES //

const { nodes } = require( 'prosemirror-schema-basic' );
const { bulletList, listItem, orderedList } = require( 'prosemirror-schema-list' );
const { tableNodes } = require( 'prosemirror-tables' );


// MAIN //

const plotSpec = {
	attrs: {
		src: {},
		alt: { default: null },
		title: { default: null },
		width: { default: '550px' }
	},
	inline: false,
	group: 'block',
	draggable: true,
	toDOM: node => {
		let style = 'display: block; margin: 0 auto;';
		if ( node.attrs.width ) {
			style += `width: ${node.attrs.width};`;
		}
		return [ 'img', {
			src: node.attrs.src,
			style,
			alt: node.attrs.alt,
			title: node.attrs.title
		}];
	},
	parseDOM: [{
		priority: 51,
		tag: 'img[src][data-tooltip]',
		getAttrs: dom => {
			const src = dom.getAttribute( 'src' );
			const title = dom.getAttribute( 'title' );
			const alt = dom.getAttribute( 'alt' );
			const width = dom.getAttribute( 'width' ) || '550px';
			const dataTooltip = dom.getAttribute( 'data-tooltip' );
			return { src, alt, title, dataTooltip, width };
		}
	}]
};

const listNodes = {
	ordered_list: {
		...orderedList,
		content: 'list_item+',
		group: 'block'
	},
	bullet_list: {
		...bulletList,
		content: 'list_item+',
		group: 'block'
	},
	list_item: {
		...listItem,
		content: 'paragraph block*',
		group: 'block'
	}
};

const footnoteSpec = {
	group: 'inline',
	content: 'inline*',
	inline: true,
	atom: true,
	toDOM: () => ['footnote', 0],
	parseDOM: [{ tag: 'footnote' }]
};


// EXPORTS //

module.exports = {
	plot: plotSpec,
	footnote: footnoteSpec,
	...nodes,
	...listNodes,
	...tableNodes({
		tableGroup: 'block',
		cellContent: 'block+'
	})
};
