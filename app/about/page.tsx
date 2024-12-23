import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

export default function About() {
  return (
    <Box
      sx={{
        py: 3,
        px: 2,
        maxWidth: 1000,
        mx: "auto",
        "& p, & ul": {
          my: 1.5,
        },
        "& ul": {
          my: 1,
          listStyle: "inside",
        },
        "&& *": {
          fontWeight: 400,
        },
      }}
    >
      <Typography>
        NosDéputés.fr est un site transpartisan géré par une équipe bénévole de
        citoyens, avec pour objectif de promouvoir l’accès à l’activité
        parlementaire française.
      </Typography>

      <Typography variant="h2">HISTOIRE DU GROUPE</Typography>

      <Typography>
        NosDéputés.fr a été initié par l’association Regards Citoyens, fondée en
        2009 par Tangui Morlier, Benjamin Ooghe-Tabanou, Jean-Baptiste
        Gabellieri et Brice Person. Depuis sa création, plusieurs autres projets
        liés à l’ouverture des données publiques ont été développés par Regards
        Citoyens, notamment Nos Sénateurs et La Fabrique de la Loi.
      </Typography>

      <Typography>
        Après plus de dix ans de développement, l’équipe fondatrice a choisi, en
        2022, de constituer une équipe de transition afin d’assurer la pérennité
        de Nos Députés. Depuis ce passage de flambeau, la nouvelle équipe s’est
        attelée à une refonte complète du site, visant à moderniser son
        ergonomie et à en renforcer l’accessibilité.
      </Typography>

      <Typography variant="h2">CE QUI NOUS UNIS / LES VALEURS</Typography>

      <Typography>
        La raison d’être de NosDéputés.fr est de revitaliser le lien entre les
        citoyens et leurs représentants.
      </Typography>

      <Typography>
        À une époque où les problèmes liés à la désinformation et aux bulles
        informationnelles prennent une ampleur croissante, il nous semble
        primordial de revenir aux faits tels qu’ils sont rendus accessibles
        publiquement. Nous voulons aider les citoyens – qu’ils soient familiers
        des institutions ou novices – à lire, comprendre et analyser la réalité
        de l’Assemblée nationale sans que des prismes idéologiques ne viennent
        altérer leur perception.
      </Typography>

      <Typography>
        Les valeurs qui ont guidé Nos Députés depuis ses débuts et qui
        continueront de le faire à l’avenir sont les suivantes :
      </Typography>
      <ul>
        <li>
          <strong>Neutralité</strong> : Nos Députés est une initiative
          transpartisane. La totalité de l’information publiée sur le site est
          exempte de liens idéologiques. Les indicateurs d’activité et les
          transcriptions des interventions des députés sont présentés de manière
          uniforme pour chaque membre de l’Assemblée, sans aucun biais dans le
          traitement des données.
        </li>
        <li>
          <strong>Transparence</strong> : Les développements de la plateforme
          visent à fournir un accès large aux données issues de l’Assemblée
          nationale, ainsi qu’à leur traitement afin qu’elles soient
          intelligibles pour le plus grand nombre. Toutes les données présentées
          sur le site sont publiques et leur publication est autorisée. Lorsque
          des analyses ou indicateurs sont ajoutés, leur méthode de calcul est
          intégralement documentée et disponible sur le dépôt du projet.
        </li>
        <li>
          <strong>Open source</strong> : Les développements liés à la plateforme
          Nos Députés sont accessibles via un dépôt GitHub sous licence
          AGPL-3.0. Cette licence impose que toute modification apportée au site
          soit publiée librement sur le dépôt et permet à toute initiative non
          commerciale de copier ou réutiliser le code, à condition que le projet
          reste lui-même accessible librement.
        </li>
      </ul>

      <Typography variant="h2">QUI SOMMES NOUS ?</Typography>

      <ul>
        <li>Alex</li>
        <li>David</li>
        <li>Emmanuel</li>
        <li>Henry</li>
        <li>Samuel</li>
        <li>Thomas</li>
      </ul>

      <Typography variant="h2">CE QUE NOUS SOUHAITONS FAIRE</Typography>

      <Typography>
        Si l’accès à l’information parlementaire s’est considérablement
        démocratisé depuis la création de Nos Députés, l’utilisation de la
        plateforme reste majoritairement réservée à des utilisateurs avertis. En
        effet, seul un utilisateur disposant de connaissances préalables sur le
        fonctionnement de l’Assemblée peut pleinement exploiter les informations
        disponibles.
      </Typography>

      <Typography>
        En analysant les besoins des citoyens, nous avons identifié trois
        obstacles majeurs à une veille personnelle équilibrée et efficace sur
        leurs sujets d’intérêt :
      </Typography>
      <ul>
        <li>
          L’absence de « thématisation » des dossiers législatifs : Les dossiers
          législatifs de l’Assemblée nationale ne sont pas catégorisés par
          thématique. Seules les commissions parlementaires permettent un
          certain tri, mais leur nombre restreint (huit commissions permanentes,
          par exemple) limite leur capacité à identifier les dossiers pertinents
          pour une personne cherchant à se concentrer sur des domaines
          spécifiques comme l’énergie, l’éducation ou la santé.
        </li>
        <li>
          La complexité du formalisme parlementaire : Les termes tels que projet
          de loi, proposition de loi, amendement ou navette parlementaire
          peuvent sembler intimidants pour une personne non familiarisée avec le
          fonctionnement institutionnel. Une explication systématique de ces
          concepts est essentielle pour rendre l’activité parlementaire
          accessible à tous.
        </li>
        <li>
          Le volume de données disponible : Pour la plupart des citoyens – même
          ceux qui s’intéressent vivement à un sujet – il est difficile de
          concilier une vie bien remplie avec la consultation de dizaines
          d’heures de travaux en commission. L’utilisation de technologies de
          synthèse pourrait offrir des résumés clairs et impartiaux des débats,
          des arguments ou encore des positions des différentes parties
          prenantes.
        </li>
      </ul>
      <Typography>
        Les développements futurs de la plateforme viseront à lever ces
        barrières, afin de rendre Nos Députés encore plus accessible et utile
        pour tous.
      </Typography>
      <Typography variant="h2">VOUS POUVEZ AUSSI CONTRIBUER</Typography>

      <Typography>Votre soutien est inestimable.</Typography>

      <Typography>
        Au-delà des coûts d’hébergement et des missions ponctuelles que nous
        finançons grâce à vos dons, vos contributions nous encouragent à aller
        de l’avant. Vous pouvez nous aider de plusieurs façons :
      </Typography>

      {/* <Typography>Vous pouvez nous aider de plusieurs façon :</Typography>
      <ul>
        <li>
          Contribuer au projet : envoyez-nous un message à [Adresse mail] en
          nous expliquant comment vous souhaiteriez participer au projet
        </li>
        <li>
          Faire un don : Vous pouvez faire un don en suivant les étapes décrites
          ici : [Instructions pour les dons et déductions fiscales]
        </li>
      </ul> */}
    </Box>
  );
}
