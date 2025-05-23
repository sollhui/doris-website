import React, { type ComponentType } from 'react';
import clsx from 'clsx';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Link from '@docusaurus/Link';
import Translate from '@docusaurus/Translate';
import { useActivePlugin, useDocVersionSuggestions, type GlobalVersion } from '@docusaurus/plugin-content-docs/client';
import { ThemeClassNames } from '@docusaurus/theme-common';
import { useDocsPreferredVersion, useDocsVersion } from '@docusaurus/plugin-content-docs/client';
import type { Props } from '@theme/DocVersionBanner';
import type { VersionBanner, PropVersionMetadata } from '@docusaurus/plugin-content-docs';

type BannerLabelComponentProps = {
    siteTitle: string;
    versionMetadata: PropVersionMetadata;
};

function UnreleasedVersionLabel({ siteTitle, versionMetadata }: BannerLabelComponentProps) {
    return (
        <Translate
            id="theme.docs.versions.unreleasedVersionLabel"
            description="The label used to tell the user that he's browsing an unreleased doc version"
            values={{
                unreleased: (
                    <b>
                        <Translate id="theme.docs.versions.unreleasedText">unreleased</Translate>
                    </b>
                ),
            }}
        >
            {'This documentation is for an {unreleased} version of Apache Doris.'}
        </Translate>
    );
}

function UnmaintainedVersionLabel({ siteTitle, versionMetadata }: BannerLabelComponentProps) {
    return (
        <Translate
            id="theme.docs.versions.unmaintainedVersionLabel"
            description="The label used to tell the user that he's browsing an unmaintained doc version"
            values={{
                siteTitle,
                versionLabel: <b>{versionMetadata.label}</b>,
            }}
        >
            {'This is documentation for {siteTitle} {versionLabel}, which is no longer actively maintained.'}
        </Translate>
    );
}

const BannerLabelComponents: {
    [banner in VersionBanner]: ComponentType<BannerLabelComponentProps>;
} = {
    unreleased: UnreleasedVersionLabel,
    unmaintained: UnmaintainedVersionLabel,
};

function BannerLabel(props: BannerLabelComponentProps) {
    const BannerLabelComponent = BannerLabelComponents[props.versionMetadata.banner!];
    return <BannerLabelComponent {...props} />;
}

function LatestVersionSuggestionLabel({
    versionLabel,
    to,
    realLatestVersion,
    onClick,
}: {
    to: string;
    onClick: () => void;
    realLatestVersion: {
        label: string;
        to: string;
    };
    versionLabel: string;
}) {
    return (
        <Translate
            id="theme.docs.versions.latestVersionSuggestionLabel"
            description="The label used to tell the user to check the latest version"
            values={{
                latestVersionLink: (
                    <b>
                        <Link to={realLatestVersion.to} onClick={onClick}>
                            <Translate
                                id="theme.docs.versions.latestVersionLinkLabel"
                                description="The label used for the latest version suggestion link label"
                            >
                                Version 3.0
                            </Translate>
                        </Link>
                    </b>
                ),
                recommondVersionLink: (
                    <b>
                        <Link to={to} onClick={onClick}>
                            <Translate
                                id="theme.docs.versions.recommondVersionLinkLabel"
                                description="The label used for the recommended version suggestion link label"
                            >
                                Version 2.1
                            </Translate>
                        </Link>
                    </b>
                ),
            }}
        >
            {/* 'For up-to-date documentation, see the {latestVersionLink} ({versionLabel}).' */}
            {'For usage, please refer to the official documentation of  {recommondVersionLink} or {latestVersionLink}.'}
        </Translate>
    );
}

function DocVersionBannerEnabled({
    className,
    versionMetadata,
}: Props & {
    versionMetadata: PropVersionMetadata;
}): React.ReactElement {
    const {
        siteConfig: { title: siteTitle },
    } = useDocusaurusContext();
    const { pluginId } = useActivePlugin({ failfast: true })!;

    const getVersionMainDoc = (version: GlobalVersion) => version.docs.find(doc => doc.id === version.mainDocId)!;

    const { savePreferredVersionName } = useDocsPreferredVersion(pluginId);

    const { latestDocSuggestion, latestVersionSuggestion } = useDocVersionSuggestions(pluginId);

    // Try to link to same doc in latest version (not always possible), falling
    // back to main doc of latest version
    const latestVersionSuggestedDoc = latestDocSuggestion ?? getVersionMainDoc(latestVersionSuggestion);

    return (
        <div
            className={clsx(className, ThemeClassNames.docs.docVersionBanner, 'alert alert--warning margin-bottom--md')}
            role="alert"
        >
            <div>
                <BannerLabel siteTitle={siteTitle} versionMetadata={versionMetadata} />
            </div>
            <div className="margin-top--md">
                <LatestVersionSuggestionLabel
                    versionLabel={latestVersionSuggestion.label}
                    to={latestVersionSuggestedDoc.path}
                    realLatestVersion={{
                        label: '3.0',
                        to: '/docs/3.0/gettingStarted/what-is-apache-doris',
                    }}
                    onClick={() => savePreferredVersionName(latestVersionSuggestion.name)}
                />
            </div>
        </div>
    );
}

export default function DocVersionBanner({ className }: Props): React.ReactElement | null {
    const versionMetadata = useDocsVersion();
    if (versionMetadata.banner) {
        return <DocVersionBannerEnabled className={className} versionMetadata={versionMetadata} />;
    }
    return null;
}
