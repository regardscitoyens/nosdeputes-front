"use client";

import {useEffect, useState} from "react";
import {
	Box,
	Typography,
	IconButton,
	Select,
	MenuItem,
	FormControl,
	InputLabel,
	FormControlLabel,
	RadioGroup,
	Radio,
	Chip,
} from "@mui/material";
import FilterListRoundedIcon from "@mui/icons-material/FilterListRounded";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Dayjs } from "dayjs";
import {useRouter, useSearchParams} from "next/navigation";

const LEGISLATURES = ["15", "16", "17"];

const RESULT_TYPES = [
	{ value: "tous", label: "Tous" },
	{ value: "interventions", label: "Interventions" },
	{ value: "amendements", label: "Amendements" },
	{ value: "questions", label: "Questions écrites" },
	{ value: "documents", label: "Documents parlementaires" },
	{ value: "commentaires", label: "Commentaires" },
	{ value: "organismes", label: "Organismes" },
	{ value: "deputes", label: "Députés" },
	{ value: "dossiers", label: "Dossiers" },
];

const SESSION_TYPES = [
	{ value: "tous", label: "Tous" },
	{ value: "commissions", label: "Réunions de commissions" },
	{ value: "debats", label: "Débats en séance plénière" },
	{ value: "questions_gouv", label: "Questions au gouvernement" },
];

const ORGANISM_TYPES = [
	{ value: "tous", label: "Tous" },
	{ value: "missions", label: "Missions parlementaires" },
	{ value: "extra", label: "Organismes extra‑parlementaires" },
];

const DOC_TYPES = [
	{ value: "tous", label: "Tous" },
	{ value: "rapports", label: "Rapports" },
	{ value: "propositions_loi", label: "Propositions de loi" },
	{ value: "rapports_info", label: "Rapport d'information" },
	{ value: "resolutions", label: "Propositions de résolution" },
	{ value: "projets_loi", label: "Projets de loi" },
	{ value: "avis", label: "Avis" },
];

const AMENDEMENT_STATUS = ["ALL", "ADOPTED", "REJECTED"];

const DEFAULT_VALUES_TO_IGNORE: any[] = ["tous", "ALL", [], null];

export default function Filter({ input }: { input: string | null }) {
	const router = useRouter();
	const searchParams = useSearchParams();

	const [legislature, setLegislature] = useState("16");
	const [startDate, setStartDate] = useState<Dayjs | null>(null);
	const [endDate, setEndDate] = useState<Dayjs | null>(null);
	const [resultType, setResultType] = useState("tous");
	const [sessionType, setSessionType] = useState("tous");
	const [organismType, setOrganismType] = useState("tous");
	const [amendStatus, setAmendStatus] = useState("ALL");
	const [docType, setDocType] = useState("tous");
	const [selectedDeputes, setSelectedDeputes] = useState<{ id: number, name: string }[]>([]);
	const [deputeQuery, setDeputeQuery] = useState("");

	useEffect(() => {
		const params = new URLSearchParams();
		if (input) {
			params.set("input", input);
			params.set("legislature", legislature);

			if (!DEFAULT_VALUES_TO_IGNORE.includes(resultType)) params.set("resultType", resultType);
			if (!DEFAULT_VALUES_TO_IGNORE.includes(sessionType)) params.set("sessionType", sessionType);
			if (!DEFAULT_VALUES_TO_IGNORE.includes(organismType)) params.set("organismType", organismType);
			if (!DEFAULT_VALUES_TO_IGNORE.includes(docType)) params.set("docType", docType);
			if (!DEFAULT_VALUES_TO_IGNORE.includes(amendStatus)) params.set("amendStatus", amendStatus);

			if (!DEFAULT_VALUES_TO_IGNORE.includes(startDate) && startDate instanceof Dayjs) {
				params.set("startDate", startDate.format("YYYY-MM-DD"));
			}
			if (!DEFAULT_VALUES_TO_IGNORE.includes(endDate) && endDate instanceof Dayjs) {
				params.set("endDate", endDate.format("YYYY-MM-DD"));
			}

			if (selectedDeputes.length > 0) {
				params.set("deputes", selectedDeputes.map((d) => d.name).join(","));
			}

			router.push(`/search?${params.toString()}`, { scroll: false });
		}
	}, [legislature, startDate, endDate, resultType, sessionType, organismType, amendStatus, docType, selectedDeputes, searchParams, input, router]);

	const handleDeputeSelected = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter" && deputeQuery.trim() !== "") {
			e.preventDefault();
			const exists = selectedDeputes.some((d) => d.name === deputeQuery.trim());
			if (!exists) {
				setSelectedDeputes((prev) => [...prev, { id: Math.random(), name: deputeQuery.trim() }]);
			}
			setDeputeQuery("");
		}
	};

	return (
		<Box sx={{ width: 300, p: 2, bgcolor: "grey.50", borderRadius: 2 }}>
			<Box display="flex" justifyContent="space-between" alignItems="center">
				<Box display="flex" alignItems="center" gap={0.5}>
					<FilterListRoundedIcon fontSize="small" />
					<Typography variant="subtitle1" fontWeight={600}>Filtre</Typography>
				</Box>
				<IconButton size="small" disabled>
					<ExpandMoreRoundedIcon />
				</IconButton>
			</Box>

			<FormControl fullWidth size="small" sx={{ mt: 2}}>
				<InputLabel id="legislature-label">Législature</InputLabel>
				<Select labelId="legislature-label" label="Législature" sx={{bgcolor: "white"}} value={legislature}
				        onChange={(e) => setLegislature(e.target.value as string)}>
					{LEGISLATURES.map((l) => (
							<MenuItem key={l} value={l}>{l}ᵉ</MenuItem>
					))}
				</Select>
			</FormControl>

			<LocalizationProvider dateAdapter={AdapterDayjs}>
				<Box mt={2} display="flex" flexDirection="column" gap={2}>
					<Typography variant="subtitle2" fontWeight={600}>Période</Typography>
					<DatePicker label="Début" value={startDate} onChange={(newValue) => setStartDate(newValue)} />
					<DatePicker label="Fin" value={endDate} onChange={(newValue) => setEndDate(newValue)}/>
				</Box>
			</LocalizationProvider>

			<Typography variant="subtitle2" fontWeight={600} mt={3}>Type de résultat</Typography>
			<RadioGroup value={resultType} onChange={(e) => setResultType(e.target.value)}>
				{RESULT_TYPES.map((t) => (
						<FormControlLabel key={t.value} value={t.value} control={<Radio size="small" />} label={t.label + " (00)"} />
				))}
			</RadioGroup>

			<Typography variant="subtitle2" fontWeight={600} mt={3}>Type de séance</Typography>
			<RadioGroup value={sessionType} onChange={(e) => setSessionType(e.target.value)}>
				{SESSION_TYPES.map((t) => (
						<FormControlLabel key={t.value} value={t.value} control={<Radio size="small" />} label={t.label + " (00)"} />
				))}
			</RadioGroup>

			<Typography variant="subtitle2" fontWeight={600} mt={3}>Type d&apos;organisme</Typography>
			<RadioGroup value={organismType} onChange={(e) => setOrganismType(e.target.value)}>
				{ORGANISM_TYPES.map((o) => (
						<FormControlLabel key={o.value} value={o.value} control={<Radio size="small" />} label={o.label} />
				))}
			</RadioGroup>

			<Typography variant="subtitle2" fontWeight={600} mt={3}>Statut amendement</Typography>
			<FormControl fullWidth size="small">
				<Select labelId="amend-status-label" label="Statut amendement" sx={{bgcolor: "white"}}  value={amendStatus}
				        onChange={(e) => setAmendStatus(e.target.value as string)}>
					{AMENDEMENT_STATUS.map((status) => (
							<MenuItem key={status} value={status}>{status}</MenuItem>
					))}
				</Select>
			</FormControl>

			<Typography variant="subtitle2" fontWeight={600} mt={3}>Type de document</Typography>
			<RadioGroup value={docType} onChange={(e) => setDocType(e.target.value)}>
				{DOC_TYPES.map((d) => (
						<FormControlLabel key={d.value} value={d.value} control={<Radio size="small" />} label={d.label + " (00)"} />
				))}
			</RadioGroup>

			<Typography variant="subtitle2" fontWeight={600} mt={3}>Par député</Typography>
			<Box display="flex" alignItems="center" gap={1}>
				<SearchRoundedIcon sx={{ color: "action.active" }} />
				<input type="text" placeholder="Rechercher un député" value={deputeQuery}
					onChange={(e) => setDeputeQuery(e.target.value)}
					onKeyDown={handleDeputeSelected}
					style={{ flex: 1, border: "none", outline: "none", fontSize: 14 }}
				/>
			</Box>
			<Box display="flex" flexWrap="wrap" gap={1} mt={1}>
				{selectedDeputes.map((d) => (
					<Chip key={d.id} label={d.name} onDelete={() =>
							setSelectedDeputes((prev) => prev.filter((p) => p.id !== d.id))
						}
					/>
				))}
			</Box>
		</Box>
	);
}
