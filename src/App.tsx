import styled from "@emotion/styled";
import { Panel, Subtitle, Title } from "@stumblestone/components";
import {
  BookinatorApp,
  BookinatorRouteMap,
} from "@stumblestone/project-bookinator";
import { EmotesRenderer, PromptsRenderer } from "@stumblestone/refdown-ui";
import { HashRouter, Link, Navigate, Outlet, Route, Routes } from "react-router-dom";

export function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route element={<GlobalElements />}>
          <Route path="app/bookinator/*" element={<BookinatorApp />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace={true} />} />
      </Routes>
    </HashRouter>
  );
}

function GlobalElements() {
  return (
    <>
      <Outlet />
      <PromptsRenderer />
      <EmotesRenderer />
    </>
  );
}

function HomePage() {
  return (
    <S.PageShell>
      <S.Hero>
        <div>
          <S.Eyebrow>GitHub Pages outpost</S.Eyebrow>
          <S.HeroTitle>StumbleStone&apos;s project graveyard.</S.HeroTitle>
        </div>

        <S.HeroCopy>
          A simple landing banner for unfinished ideas, sleeping prototypes, and
          future rebuilds. Bookinator is now wired in as the first larger app.
        </S.HeroCopy>

        <S.LinkRow>
          <S.InternalLinkButton to={BookinatorRouteMap.LIBRARY}>
            Launch Bookinator
          </S.InternalLinkButton>
          <S.LinkButton href="https://github.com/StumbleStone/stumblestone.github.io">
            Open the repo
          </S.LinkButton>
          <S.LinkButton
            $secondary={true}
            href="https://github.com/StumbleStone?tab=repositories"
          >
            Browse repositories
          </S.LinkButton>
        </S.LinkRow>
      </S.Hero>

      <S.Footer>
        Maintained by{" "}
        <a href="https://github.com/StumbleStone">StumbleStone</a>{" "}
        {new Date().getFullYear()}
      </S.Footer>
    </S.PageShell>
  );
}

namespace S {
  export const PageShell = styled.main`
    width: min(1120px, calc(100% - 1.5rem));
    margin: 0 auto;
    padding: 24px 0 40px;
    display: grid;
    gap: ${({ theme }) => theme.space.lg};
  `;

  export const Hero = styled(Panel)`
    display: grid;
    gap: ${({ theme }) => theme.space.lg};
    max-width: 720px;
    margin: min(16vh, 120px) auto 0;
    background:
      linear-gradient(
        135deg,
        ${({ theme }) => theme.graveyard.heroGlow},
        transparent 36%
      ),
      linear-gradient(
        160deg,
        ${({ theme }) => theme.graveyard.heroMossGlow},
        transparent 60%
      ),
      ${({ theme }) => theme.graveyard.panelSurface};
  `;

  export const Eyebrow = styled.p`
    margin: 0 0 ${({ theme }) => theme.space.sm};
    color: ${({ theme }) => theme.graveyard.eyebrowText};
    font-size: 0.82rem;
    letter-spacing: 0.16em;
    text-transform: uppercase;
  `;

  export const HeroTitle = styled(Title)`
    max-width: 10ch;
    font-size: clamp(2.8rem, 9vw, 5.8rem);
  `;

  export const HeroCopy = styled(Subtitle)`
    margin: 0;
    max-width: 40rem;
    color: ${({ theme }) => theme.graveyard.panelText};
  `;

  export const LinkRow = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: ${({ theme }) => theme.space.md};
  `;

  export const InternalLinkButton = styled(Link)`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-height: ${({ theme }) => theme.button.minHeight};
    padding: ${({ theme }) =>
      `${theme.button.paddingBlock} ${theme.button.paddingInline}`};
    border-radius: ${({ theme }) => theme.button.borderRadius};
    border: 1px solid ${({ theme }) => theme.button.tones.primary.borderColor};
    background: ${({ theme }) => theme.button.tones.primary.background};
    box-shadow: ${({ theme }) => theme.button.tones.primary.boxShadow};
    color: ${({ theme }) => theme.button.tones.primary.textColor};
    font-weight: 600;
    text-decoration: none;
    transition:
      transform 120ms ease,
      box-shadow 120ms ease,
      border-color 120ms ease;

    &:hover {
      transform: translateY(-3px);
    }

    &:focus-visible {
      outline: 2px solid ${({ theme }) => theme.button.focusRingColor};
      outline-offset: 2px;
    }
  `;

  export const LinkButton = styled.a<{ $secondary?: boolean }>`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-height: ${({ theme }) => theme.button.minHeight};
    padding: ${({ theme }) =>
      `${theme.button.paddingBlock} ${theme.button.paddingInline}`};
    border-radius: ${({ theme }) => theme.button.borderRadius};
    border: 1px solid
      ${({ theme, $secondary }) =>
        $secondary
          ? theme.button.tones.secondary.borderColor
          : theme.button.tones.primary.borderColor};
    background: ${({ theme, $secondary }) =>
      $secondary
        ? theme.button.tones.secondary.background
        : theme.button.tones.primary.background};
    box-shadow: ${({ theme, $secondary }) =>
      $secondary
        ? theme.button.tones.secondary.boxShadow
        : theme.button.tones.primary.boxShadow};
    color: ${({ theme, $secondary }) =>
      $secondary
        ? theme.button.tones.secondary.textColor
        : theme.button.tones.primary.textColor};
    font-weight: 600;
    text-decoration: none;
    transition:
      transform 120ms ease,
      box-shadow 120ms ease,
      border-color 120ms ease;

    &:hover {
      transform: translateY(-3px);
    }

    &:focus-visible {
      outline: 2px solid ${({ theme }) => theme.button.focusRingColor};
      outline-offset: 2px;
    }
  `;

  export const Footer = styled.footer`
    color: ${({ theme }) => theme.colors.textMuted};
    text-align: center;

    a {
      color: ${({ theme }) => theme.graveyard.eyebrowText};
    }
  `;
}
