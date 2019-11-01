'use strict';

// MODULES //

const { nodes } = require( 'prosemirror-schema-basic' );
const { listItem, bulletList, orderedList } = require( 'prosemirror-schema-list' );
const { tableNodes } = require( 'prosemirror-tables' );
const paragraphSpec = require( './paragraph.js' );
const headingSpec = require( './heading.js' );


// MAIN //

const plotSpec = {
	attrs: {
		src: {},
		alt: { default: null },
		title: { default: null },
		meta: { default: null },
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
		return [ 'span', { class: 'img-container' }, [ 'img', {
				src: node.attrs.src,
				style,
				alt: node.attrs.alt,
				title: node.attrs.title
			} ], [ 'pre',
			{
				class: 'img-tooltip'
			}, node.attrs.meta ]
		];
	},
	parseDOM: [{
		priority: 51,
		tag: 'img[src][data-plot-id]',
		getAttrs: dom => {
			const src = dom.getAttribute( 'src' );
			const title = dom.getAttribute( 'title' );
			const alt = dom.getAttribute( 'alt' );
			const width = dom.getAttribute( 'width' ) || '550px';
			const meta = dom.getAttribute( 'data-plot-meta' );
			return { src, alt, title, meta, width };
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
	parseDOM: [{
		tag: 'footnote'
	}]
};


// EXPORTS //

module.exports = {
	plot: plotSpec,
	footnote: footnoteSpec,
	...nodes,
	...listNodes,
	paragraph: paragraphSpec,
	heading: headingSpec,
	...tableNodes({
		tableGroup: 'block',
		cellContent: 'block+'
	})
};
