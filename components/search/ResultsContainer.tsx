"use client";

import { Box, Typography, Collapse, IconButton, Button } from "@mui/material";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import { useState } from "react";

const MOCK_SECTIONS = [
	{
		key: "interventions",
		title: "Interventions",
		count: 13,
		items: Array.from({ length: 13 }, (_, i) => `Contenu de l'intervention ${i + 1}`),
	},
	{
		key: "amendements",
		title: "Amendements",
		count: 5,
		items: Array.from({ length: 5 }, (_, i) => `Texte de l'amendement ${i + 1}`),
	},
	{
		key: "documents",
		title: "Documents",
		count: 2,
		items: Array.from({ length: 2 }, (_, i) => `Titre du document ${i + 1}`),
	},
];

export default function ResultsContainer({ input }: { input: string | null }) {
	return (
		<Box flex={1}>
			{!input || input.trim() === "" ? (
				<Typography variant="h6" mb={3}>
					Veuillez saisir une recherche pour afficher des résultats.
				</Typography>
			) : (
				<>
				<Typography variant="h6" mb={3}>
					Résultats pour : «<strong>{input}</strong>»
				</Typography>

				{MOCK_SECTIONS.map((section) => (
					<ResultSection
						key={section.key}
						title={section.title}
						count={section.count}
						items={section.items}
					/>
				))}
				</>
			)}
		</Box>
	);

}

function ResultSection({ title, count, items }: {
	title: string;
	count: number;
	items: string[];
}) {
	const [open, setOpen] = useState(true);
	return (
		<Box mb={4}>
			<Box display="flex" justifyContent="space-between" alignItems="center">
				<Typography fontWeight={600}>
					{title} — {count.toString().padStart(2, "0")}
				</Typography>
				<IconButton onClick={() => setOpen(!open)}>
					<ExpandMoreRoundedIcon
						sx={{ transform: open ? "rotate(0)" : "rotate(180deg)", transition: "0.2s" }}
					/>
				</IconButton>
			</Box>

			<Collapse in={open}>
				<Box mt={1} display="flex" flexDirection="column" gap={1}>
					{items.slice(0, 8).map((item, i) => (
						<Box key={i}
							sx={{
								p: 2,
								borderRadius: 1,
								bgcolor: "grey.100",
								fontSize: 14,
							}}
						>
							{item}
						</Box>
					))}
				</Box>

				{items.length > 8 && (
					<Button size="small" sx={{ mt: 1 }} variant="outlined">
						Voir plus
					</Button>
				)}
			</Collapse>
		</Box>
	);
}
