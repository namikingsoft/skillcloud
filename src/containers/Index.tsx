import FullBlock from 'components/FullBlock'
import * as React from 'react'
import {Component, PropTypes} from 'react'
import {Link} from 'react-router'

export default class Index extends Component<any, any>
{
  render() {
    return (
      <div className="layout-index">
        <FullBlock className="block block__profile">
          <section className="block__profile__meta">
            <h1>Portfolio</h1>
            <div className="block__profile__meta__position">
              フロントエンドエンジニア
            </div>
            <div className="block__profile__meta__name">
              並木　翼
            </div>
            <div className="block__profile__meta__ruby">
              Tsubasa Namiki
            </div>
            <div className="block__profile__meta__sns">
              <ul>
                <li><i className="fa fa-github"></i> GitHub</li>
                <li><i className="fa fa-twitter"></i> Twitter</li>
                <li><i className="fa fa-home"></i> Blog</li>
              </ul>
            </div>
          </section>
        </FullBlock>
        <FullBlock className="block block__technology">
          <div className="block__technology__text">
            <section>
              <h2>最近よく使う技術</h2>
              <p>
                新しい物が好きで、ここには全てを書ききれませんが、<br/>
                あえて数点にしぼってみました。
              </p>
            </section>
          </div>
          <div className="block__technology__logo">
            <ul>
              <li><img src="/images/screen-react.png" /></li>
              <li><img src="/images/screen-d3js.png" /></li>
              <li><img src="/images/logo-nodejs.png" /></li>
              <li><img src="/images/logo-typescript.png" /></li>
              <li><img src="/images/logo-docker.png" /></li>
              <li><img src="/images/logo-mongodb.png" /></li>
            </ul>
          </div>
        </FullBlock>
        <FullBlock className="block block__tachiyomi">
          <div className="block__tachiyomi__image">
            <img className="display" src="/images/display1.png" />
            <img className="anime" src="/images/tachiyomi.gif" />
          </div>
          <div className="block__tachiyomi__text">
            <section>
              <span>ブラウザで立ち読みできる電子書籍ビューア</span>
              <h2>サイト訪問者を楽しませたかった。</h2>
              <p>
                誰に言われるわけでもなく、気づいたらプロトタイプを作っていました。
                `HTML5 Canvas`を用いた違法コピーを防止する難読化技術も搭載。
              </p>
              <p>
                導入後、立ち読みコンテンツを起点としたページの
                検索オーガニック流入が大幅にアップしました。
              </p>
              <div className="meta">
                <h3>開発期間・規模</h3>
                <ul>
                  <li>開発2014年中期2〜3ヶ月(1〜3人)</li>
                </ul>
                <h3>担当範囲</h3>
                <ul>
                  <li>プロジェクトリーダー</li>
                  <li>メインプログラマ</li>
                </ul>
                <h3>使用技術</h3>
                <ul>
                  <li>HTML5 Canvas</li>
                  <li>HTML5 Audio</li>
                  <li>Backbone.js</li>
                  <li>Grunt</li>
                  <li>Browserify</li>
                </ul>
              </div>
            </section>
          </div>
        </FullBlock>
        <FullBlock className="block block__search">
          <div className="block__search__image">
            <img className="display" src="/images/display2.png" />
            <img className="anime" src="/images/search.gif" />
          </div>
          <div className="block__search__text">
            <section>
              <span>言葉の連想を利用した検索ソリューション</span>
              <h2>無難なものを作りたくなかった。</h2>
              <p>
                検索ワードから連想した言葉と検索結果とグラフィカルに表した
                前衛的なUIは、お客様にも大好評でした。
              </p>
              <p>
                実用性はこれからですが、展示会での出展様子がITmediaの記事になり、PR効果をもたらしました。
              </p>
              <div className="meta">
                <h3>開発期間・規模</h3>
                <ul>
                  <li>2015年中期2.5ヶ月(1〜3人)</li>
                </ul>
                <h3>担当範囲</h3>
                <ul>
                  <li>機能提案</li>
                  <li>プロジェクトリーダー</li>
                  <li>バックエンド</li>
                  <li>フロントエンド</li>
                </ul>
                <h3>使用技術</h3>
                <ul>
                  <li>MongoDB</li>
                  <li>Express</li>
                  <li>Angular</li>
                  <li>Node.js</li>
                  <li>Apache ManifoldCF</li>
                  <li>Mecab</li>
                </ul>
              </div>
            </section>
          </div>
        </FullBlock>
        <FullBlock className="block block__fullstack">
          <div className="block__fullstack__image">
            <img src="/images/app.png" />
          </div>
          <div className="block__fullstack__text">
            <section>
              <span>スマホで打刻できる勤怠管理システム</span>
              <h2>アプリ開発・インフラ構築まで幅広く。</h2>
              <p>
                インフラ構築・Web画面＆API開発・アプリ開発、ほぼ全ての作業を一人で、スピード感をもって行う経験ができました。
              </p>
              <p>
                今までExcel管理だった自社内の勤怠入力＆集計をシステム化。
                今後は外部へのサービス提供も視野に入れているそうです。
              </p>
              <div className="meta">
                <h3>開発期間・規模</h3>
                <ul>
                  <li>開発2013年1〜2月(1人)</li>
                  <li>保守2013年3月以降(1〜2人)</li>
                </ul>
                <h3>担当範囲</h3>
                <ul>
                  <li>プロジェクトリーダー</li>
                  <li>インフラ構築</li>
                  <li>アプリ開発</li>
                  <li>Web画面＆API開発</li>
                  <li>保守</li>
                </ul>
                <h3>使用技術</h3>
                <ul>
                  <li>Titanium Mobile CLI</li>
                  <li>Ruby on Rails</li>
                  <li>Apache Passenger</li>
                  <li>MySQL</li>
                  <li>DeployGate</li>
                </ul>
              </div>
            </section>
          </div>
        </FullBlock>
        <FullBlock className="block block__automation">
          <section>
            <div className="block__automation__image">
              <img src="/images/automation.png" />
            </div>
            <div className="block__automation__text">
              <span>インフラ環境構築の自動化</span>
              <h2>自動化は漢のロマン。</h2>
              <p>
                煩雑化しやすい開発環境構築の自動化、
                プルリクエストされたブランチの自動ビルドを行い、
                マージ前に、通知してくれる仕組みを構築などを進んで行いました。
              </p>
              <p>
                新規参入メンバーの環境構築の時間短縮、
                作業用MacのSSDが飛んだ時のリカバリーに重宝しました。
              </p>
              <div className="meta">
                <h3>開発期間・規模</h3>
                <ul>
                  <li>2014年初期以降(1人)</li>
                </ul>
                <h3>使用技術</h3>
                <ul>
                  <li>Docker</li>
                  <li>Chef</li>
                  <li>Ansible</li>
                  <li>Vagrant</li>
                  <li>Jenkins</li>
                  <li>GitLab</li>
                </ul>
              </div>
            </div>
          </section>
        </FullBlock>
      </div>
    )
  }
}
