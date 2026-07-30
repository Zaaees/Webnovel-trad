import update_chapter
import json

ch_number = 153
title = "Chapitre 153 : La Valeur d'un Héritier (7)"
draft_text = """— Hein ? Moi ?

Nhu Yayen écarquilla les yeux et se désigna du doigt. C’était un homme, mais il portait des vêtements de soie rouge à motifs de papillons et un maquillage qui rendaient difficile d'imaginer qu'il puisse être l’un des 12 anciens du Culte Démoniaque.

[Prince Chun. L'Oncle Huan… Je veux dire, l'Ancien ne vous a-t-il pas demandé de le trouver parmi ces personnes ?]

Mun Ku envoya rapidement un message télépathique à Yeowun. Huan Yi avait désigné six personnes assises autour de lui. Il était difficile de reconnaître qui était le véritable Huan Yi ici, mais Mun Ku soupçonnait l'homme qui s'était légèrement tourné vers elle un peu plus tôt d'être le véritable Huan Yi. Elle comptait le lui faire savoir après avoir pris un peu de temps pour observer, mais elle ne s'attendait pas à ce que Yeowun désigne quelqu'un de complètement hors contexte.

— Hmmm… c'est choquant. Je ne pensais pas que vous diriez que je suis le maître.

Nhu Yayen fronça les sourcils en se touchant les lèvres. Chun Yeowun pointa alors du doigt les sept Huan Yi assis sur le bureau.

— L'Ancien Huan m'a dit de le trouver tout en montrant ces personnes, mais lorsqu'il a parlé, il a simplement dit de le trouver "dans cet endroit". Il n'a jamais affirmé que le vrai "lui" se trouvait parmi ces sept personnes.

— OH !

Mun Ku se rappela alors ce que Huan Yi avait également dit.

‘Pouvez-vous trouver le vrai moi dans cet endroit ?’

En y repensant maintenant, Mun Ku ne se souvenait pas que Huan Yi ait précisé qu'il se trouvait parmi ces gens. Mais il était tout de même très audacieux de penser que Nhu Yayen était Huan Yi.

— Mais ce n'est pas une preuve suffisante. Ne gâchez-vous pas votre chance avec une décision aussi hâtive ?

Nhu Yayen secoua la tête et s'exprima ainsi, mais Chun Yeowun sourit.

— Il y a un moyen plus simple de le découvrir.

— Un moyen plus simple ?

— Veuillez excuser mon impolitesse.

— Quoi ?

Et à cet instant, Chun Yeowun s'élança comme l'éclair vers Nhu Yayen. Sa main, nimbée d'un qi astral bleu de sabre, s'abattit sur le cou de Nhu Yayen pour tenter de le trancher. C'était bien trop rapide pour être esquivé.

— Ah— !

Les yeux de Mun Ku s'écarquillèrent. Nhu Yayen, qui n'aurait dû être qu'un simple conseiller, resta fermement campé sur ses positions et matérialisa un qi astral bleu sur sa main pour bloquer l'attaque de Yeowun. Yeowun sourit et s'adressa à Nhu Yayen.

— Direz-vous toujours que vous n'êtes pas Huan Yi ?

— …C'est inattendu.

L'épreuve de Huan Yi aux Mille Visages. C'était un test conçu pour être en réalité presque impossible. Personne d'autre que le Seigneur n'avait jamais vu le véritable visage de Huan Yi. Même Mun Ku, la fille de l'ami de Huan Yi, n'avait jamais vu ni entendu sa véritable voix ou son vrai visage. Il était impossible de trouver la bonne réponse alors qu'ils ignoraient totalement à quoi ressemblait la réponse. Huan Yi avait une personnalité étrange. Le but de ce premier test était de surprendre Yeowun et d'observer sa réaction, non pas de le forcer à trouver la réponse. Il aurait été satisfait si Yeowun avait calmement tenté de chercher la solution. Mais il ne s'attendait pas du tout à ce que Yeowun le trouve réellement.

— Comment avez-vous su ?

Lorsque Nhu Yayen révéla sa puissance, l'air tout entier autour de la cour fut saturé d'une force écrasante. Même Mun Ku, une guerrière de niveau maître supérieur, frissonna face à cette énergie. Il semblait que cette énergie interne renfermait une aura sombre qui la rendait effrayante.

— Vous n'allez pas me dire que vous en avez juste choisi un au hasard, n'est-ce pas ?

— C'est à cause du message télépathique.

— Un message télépathique ?

Yeowun se remémora la scène un peu plus tôt. Lorsqu'il avait vu Nhu Yayen pour la première fois, il n'avait même pas songé qu'il puisse être Huan Yi, car Nhu Yayen dissimulait parfaitement son énergie. Ses manières efféminées avaient également joué un rôle. Mais lorsque Yeowun avait vu les sept Huan Yi sur la table, il avait ressenti que quelque chose clochait. Huan Yi, qui parlait de manière si naturelle, avait commencé à répondre avec un temps de retard après avoir été interrogé, juste après que Mun Ku se soit présentée.

‘Pourquoi fait-il cela ?’

Yeowun, trouvant cela étrange, avait alors remarqué que le cou de Mun Ku tremblait légèrement lorsqu'elle lui avait envoyé un message télépathique. Yeowun avait ensuite rapidement changé de sujet pour que le faux Huan Yi ne puisse pas réagir. Et comme prévu, le Huan Yi qui parlait avec lui avait mis un certain temps avant de répondre.

‘Personne… n'a le cou qui tremble.’

Pensant que sa théorie pouvait être erronée et se demandant s'il était possible d'envoyer un message télépathique sans que le cou ne tremble, Yeowun avait alors interrogé Nano.

‘Nano, peux-tu découvrir comment le son est produit lorsque Mun Ku m'envoie ce message télépathique ? Comment cela fonctionne-t-il ?’

Il n'avait posé la question qu'à tout hasard, mais une réponse inattendue lui était parvenue.

[C'est possible. Détection d'une fréquence de vibration différente. Ajustement en cours pour permettre à l'utilisateur de l'entendre.]

Dès que Nano eut terminé sa phrase, Yeowun entendit un léger sifflement étrange résonner dans son oreille, et il capta quelque chose qu'il n'avait jamais entendu jusqu'alors.

[Je vous ai traité comme tel depuis le début.]

Lorsque la voix résonna, le Huan Yi sur la table prononça exactement la même chose.

— Je vous ai traité comme tel depuis le début."""

validation_notes = "Draft translation matches original paragraphs 1:1. Meanings are accurately conveyed and fluid. Vocabulary strictly follows the glossary (e.g. qi astral bleu de sabre for blue force qi of blade)."

translated_text = draft_text

new_lore = [
    {
        "id": "g-auto-nhu-yayen",
        "original": "Nhu Yayen",
        "translation": "Nhu Yayen",
        "notes": "Conseiller au sein du Culte Démoniaque, identité d'emprunt utilisée par le 12e Ancien Huan Yi."
    },
    {
        "id": "g-auto-huan-yi",
        "original": "Huan Yi",
        "translation": "Huan Yi",
        "notes": "Le 12e Ancien du Culte Démoniaque, surnommé Mille Visages, expert en déguisement."
    }
]

update_chapter.update_chapter(ch_number, title, draft_text, validation_notes, translated_text, new_lore)
print("Chapter 153 translation update successful.")
