'use client'

import React from 'react'
import {
	MDXEditor,
	toolbarPlugin,
	BoldItalicUnderlineToggles,
	UndoRedo,
	BlockTypeSelect,
	ListsToggle,
	Separator,
	headingsPlugin,
	listsPlugin,
	linkPlugin,
	quotePlugin,
	markdownShortcutPlugin,
	codeBlockPlugin,
	codeMirrorPlugin,
	diffSourcePlugin,
} from '@mdxeditor/editor'

type EditorDemoProps = {
	initialMarkdown?: string
}

export default function EditorDemo({ initialMarkdown = 'Select some text to see the floating toolbar.' }: EditorDemoProps) {
	const [value, setValue] = React.useState<string>(initialMarkdown)


	const BubbleToolbar: React.FC = () => {
		const [visible, setVisible] = React.useState(false)
		const [position, setPosition] = React.useState<{ top: number; left: number }>({ top: 0, left: 0 })

		React.useEffect(() => {
			function updateFromSelection() {
				const selection = window.getSelection()
				if (!selection || selection.rangeCount === 0) {
					setVisible(false)
					return
				}
				const range = selection.getRangeAt(0)
				if (range.collapsed) {
					setVisible(false)
					return
				}
				const rect = range.getBoundingClientRect()
				setPosition({ top: rect.top + window.scrollY - 44, left: rect.left + window.scrollX })
				setVisible(true)
			}

			document.addEventListener('selectionchange', updateFromSelection)
			return () => document.removeEventListener('selectionchange', updateFromSelection)
		}, [])

		if (!visible) return null
		return (
			<div
				className="fixed z-50 rounded-md border border-black/10 bg-white shadow-md p-1 flex items-center gap-1"
				style={{ top: position.top, left: position.left }}
				onMouseDown={(e) => {
					// Keep the editor selection active while interacting with the toolbar
					e.preventDefault()
				}}
			>
				<BlockTypeSelect />
				<Separator />
				<ListsToggle options={["bullet"]} />
				<Separator />
				<BoldItalicUnderlineToggles />
				<UndoRedo />
			</div>
		)
	}

	return (
		<div className="relative w-full max-w-2xl bg-black">
		<div className="relative w-full max-w-2xl bg-white overflow-hidden">
			<MDXEditor
				markdown={value}
				onChange={setValue}
				plugins={[
					headingsPlugin(),
					listsPlugin(),
					linkPlugin(),
					quotePlugin(),
					markdownShortcutPlugin(),
					codeBlockPlugin({ defaultCodeBlockLanguage: '' }),
					codeMirrorPlugin({
						codeBlockLanguages: {
							js: 'JavaScript',
							ts: 'TypeScript',
							jsx: 'JSX',
							tsx: 'TSX',
							css: 'CSS',
							html: 'HTML',
							bash: 'Bash',
							json: 'JSON',
						},
						autoLoadLanguageSupport: true,
					}),
					diffSourcePlugin({ viewMode: 'rich-text' }),
					toolbarPlugin({ toolbarContents: () => <BubbleToolbar /> }),
				]}
				className="prose max-w-none"
			/>
		</div>
			<div className="mt-6">
				<div className="text-sm font-medium text-foreground/80 mb-2">Markdown</div>
				<textarea
					value={value}
					readOnly
					rows={8}
					className="w-full font-mono text-sm rounded-md border border-black/10 bg-white/80 p-3 shadow-inner focus:outline-none"
				/>
			</div>
		</div>
	)
}


