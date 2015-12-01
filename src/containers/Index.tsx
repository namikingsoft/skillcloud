import FullBlock from 'components/FullBlock'
import SkillCloudCanvas from 'components/SkillCloudCanvas'
import Skill from 'domains/Skill'
import SkillNode from 'domains/SkillNode'
import * as SkillConst from 'constants/SkillConst'
import * as Action from 'actions/Action'
import * as React from 'react'
import {Component, PropTypes} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {clone} from 'lodash'

interface Props {
  selected: Skill
  selectSkill: (skill: Skill)=>Object
}

interface State {
  transform?: string
  transition?: string
  opacity?: number
  display?: string
}

@connect(
  state => clone(state.skill),
  dispatch => bindActionCreators(Action, dispatch)
)

export default class Index extends Component<Props, State>
{
  render() {
    return (
      <div className="layout-index">
        <FullBlock className="block block__profile">
          <div className="half block__profile__meta">
            <div className="block__profile__meta__position">
              フロントエンドエンジニアのポートフォリオ
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
          </div>
          <div className="block__profile__guard" />
          <div className="block__profile__skillcloud" style={this.state}>
            <SkillCloudCanvas
              cloud={SkillConst.rootCloud}
              selected={this.selectedNode}
              onRide={skill => null}
              onDown={skill => null} />
          </div>
        </FullBlock>
        <FullBlock className="block block__index">
          <div className="half block__index__anchor">
            <h2>主な制作実績の紹介</h2>
            <ul>
              <li>
                <a href="#tachiyomi">
                  <h3>ブラウザで立ち読みできる電子書籍ビューア</h3>
                  <p>
                    オーディオ再生や元ファイル抽出を防止する難読化機能など。
                  </p>
                </a>
              </li>
              <li>
                <a href="#search">
                  <h3>言葉の連想を利用した検索ソリューション</h3>
                  <p>
                    検索結果や連想ワードをグラフィカルに表現した前衛的UIが特徴。
                  </p>
                </a>
              </li>
              <li>
                <a href="#fullstack">
                  <h3>スマホで打刻できる勤怠管理システム</h3>
                  <p>
                    アプリ開発からインフラ構築までフルスタックに対応。
                  </p>
                </a>
              </li>
              <li>
                <a href="#automation">
                  <h3>インフラ環境構築の自動化</h3>
                  <p>
                    開発環境の自動構築からCIツールとの連携部分の構築を担当。
                  </p>
                </a>
              </li>
              <li>
                <a href="#skillcloud">
                  <h3>スキルクラウド</h3>
                  <p>
                    スキルごとの経験や興味を視覚化したをフロントエンドのデモ。
                  </p>
                </a>
              </li>
            </ul>
          </div>
          <div className="half block__index__technology">
            <div className="block__index__technology__text">
                <h2>最近よく使う技術</h2>
                <p>
                  新しい物が好きで、ここには全てを書ききれませんが、<br/>
                  あえて数点にしぼってみました。
                </p>
            </div>
            <div className="block__index__technology__logo">
              <ul>
                <li><img src="/images/logo-nodejs.png" /></li>
                <li><img src="/images/logo-typescript.png" /></li>
                <li><img src="/images/logo-react.png" /></li>
                <li><img src="/images/screen-d3js.png" /></li>
                <li><img src="/images/logo-docker.png" /></li>
                <li><img src="/images/logo-mongodb.png" /></li>
              </ul>
            </div>
          </div>
        </FullBlock>
        <FullBlock className="block block__tachiyomi" id="tachiyomi">
          <div className="half block__tachiyomi__text">
            <strong>ブラウザで立ち読みできる電子書籍ビューア</strong>
            <h2>サイト訪問者を楽しませたかった。</h2>
            <p>
              誰に言われるわけでもなく、気づいたらプロトタイプを作っていました。
              １プロジェクトに立ち上げに成功し、運用開発を含めたリーダーとして携わりました。
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
          </div>
          <div className="half block__tachiyomi__image">
            <img className="display" src="/images/display1.png" />
            <img className="anime" src="/images/tachiyomi.gif" />
          </div>
        </FullBlock>
        <FullBlock className="block block__search" id="search">
          <div className="half block__search__text">
            <strong>言葉の連想を利用した検索ソリューション</strong>
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
          </div>
          <div className="half block__search__image">
            <img className="display" src="/images/display2.png" />
            <img className="anime" src="/images/search.gif" />
          </div>
        </FullBlock>
        <FullBlock className="block block__fullstack" id="fullstack">
          <div className="half block__fullstack__text">
            <strong>スマホで打刻できる勤怠管理システム</strong>
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
          </div>
          <div className="half block__fullstack__image">
            <img src="/images/app.png" />
          </div>
        </FullBlock>
        <FullBlock className="block block__automation" id="automation">
          <div className="half block__automation__text">
            <strong>インフラ環境構築の自動化</strong>
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
          <div className="half block__automation__image">
            <img src="/images/automation.png" />
          </div>
        </FullBlock>
        <FullBlock className="block block__skillcloud" id="skillcloud">
          <div className="half block__automation__text">
            <strong>インフラ環境構築の自動化</strong>
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
          <div className="half block__automation__image">
            <img src="/images/automation.png" />
          </div>
        </FullBlock>
      </div>
    )
  }

  componentDidMount() {
    new Promise((resolve, reject) => {
      this.props.selectSkill(null)
      setTimeout(resolve, 2500)
    }).
    then(() => new Promise((resolve, reject) => {
      this.setState({
        transform: "scale(1.75)",
        transition: "1.0s ease-in",
        opacity: 1.0,
      })
      setTimeout(resolve, 1000)
    })).
    then(() => new Promise((resolve, reject) => {
      this.setState({
        transform: "scale(5)",
        transition: "0.3s",
        opacity: 0,
      })
      setTimeout(resolve, 300)
    })).
    then(() => new Promise((resolve, reject) => {
      this.setState({
        display: 'none',
      })
    }))
  }

  private get selectedNode(): SkillNode {
    const {selected} = this.props
    return SkillConst.rootCloud.findNodeBySkill(selected)
  }
}
