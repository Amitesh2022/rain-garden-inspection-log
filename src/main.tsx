import {createRoot} from 'react-dom/client'
import {Fragment,useEffect,useMemo,useState} from 'react'
import './style.css'
import {Desk,select,categories,stages,value,formatDate,type State} from './desk'
const desk=new Desk()
const count=(state:State)=>Object.fromEntries(stages.map(stage=>[stage,state.records.filter(r=>r.stage===stage).length]))
function App(){
 const [s,set]=useState(desk.state)
 useEffect(()=>{const off=desk.subscribe(set);const stop=desk.start();return()=>{off();stop()}},[])
 const visible=useMemo(()=>select(s.records,s.query,s.filter,s.sort),[s.records,s.query,s.filter,s.sort])
 const totals=useMemo(()=>count(s),[s])
 return <>
<header className="top"><div className="wrap bar"><a className="brand" href="#board"><span className="mark" aria-hidden="true">⬡</span>Rain Garden Inspection Log</a><nav aria-label="Workspace"><a href="#board" aria-current={s.page==='board' ? 'page' : undefined}>Inspections</a><a href="#guide" aria-current={s.page==='guide' ? 'page' : undefined}>Field guide</a></nav></div></header>
<main className="wrap">
{s.page==='board'&&<>
<section className="hero"><div><p className="eyebrow">GREEN INFRASTRUCTURE / WORK QUEUE</p><h1>Rain Garden Inspection Log</h1><p className="lead">Track what rain gardens need after storms so maintenance crews can clear blockages before the next downpour.</p></div><button type="button" onClick={()=>{desk.edit()}}>New inspection</button></section>
<section className="stats" aria-label="Queue by stage">{stages.map(stage=><Fragment key={stage}><div className="stat"><span className="stat-label">{stage}</span><strong>{totals[stage] ?? 0}</strong></div></Fragment>)}</section>
<section className="panel" aria-labelledby="queue"><div className="panel-head"><h2 id="queue">Inspection queue</h2><span>{visible.length} visible</span></div>
<div className="filters"><label>Search records<input type="search" placeholder="Site, crew or condition" value={s.query} onChange={(e)=>{desk.set({query:value(e.nativeEvent)})}} /></label><label>Water feature<select aria-label="Water feature" value={s.filter} onChange={(e)=>{desk.set({filter:value(e.nativeEvent)})}}><option value="">All features</option>{categories.map(x=><Fragment key={x}><option value={x}>{x}</option></Fragment>)}</select></label><label>Sort by<select aria-label="Sort by" value={s.sort} onChange={(e)=>{desk.set({sort:value(e.nativeEvent)})}}><option value="due">Due date</option><option value="title">Title</option></select></label></div>
{s.success&&<><p role="status" className="success">{s.success}</p></>}
{s.error&&<><p role="alert">{s.error}</p><button type="button" onClick={()=>{desk.load()}}>Reload list</button></>}
{s.loading&&<><p role="status">Loading records…</p></>}
{!s.loading && !s.error && visible.length===0&&<><p className="empty">No records match. Change the search or category.</p></>}
<ul className="records">{visible.map(row=><Fragment key={row.id}><li><div><strong>{row.title}</strong><small>{row.owner} · {row.context}</small><small className="measurement">Ponding depth in centimetres: {row.amount}</small></div><span className="pill">{row.category}</span><span>{row.stage}</span><span>{formatDate(row.due)}</span><button type="button" className="secondary" onClick={()=>{desk.edit(row)}} aria-label={'Edit '+row.title}>Edit</button></li></Fragment>)}</ul></section></>}
{s.page==='editor'&&<><div className="inner"><a href="#board">← Back to inspections</a><p className="eyebrow">GREEN INFRASTRUCTURE / RECORD</p><h1>{s.id?'Edit record':'New record'}</h1><form className="panel form" onSubmit={(e)=>{desk.save(e.nativeEvent)}}>
<label>Inspection title<input required type="text" maxLength={100} value={s.draft.title} onChange={(e)=>{desk.field('title',e.nativeEvent)}} /></label><label>Maintenance crew<input required type="text" maxLength={80} value={s.draft.owner} onChange={(e)=>{desk.field('owner',e.nativeEvent)}} /></label><label>Water feature<select aria-label="Water feature" value={s.draft.category} onChange={(e)=>{desk.field('category',e.nativeEvent)}}>{categories.map(x=><Fragment key={x}><option value={x}>{x}</option></Fragment>)}</select></label><label>Stage<select aria-label="Stage" value={s.draft.stage} onChange={(e)=>{desk.field('stage',e.nativeEvent)}}>{stages.map(x=><Fragment key={x}><option value={x}>{x}</option></Fragment>)}</select></label><label>Site or asset reference<input required type="text" maxLength={100} value={s.draft.context} onChange={(e)=>{desk.field('context',e.nativeEvent)}} /></label><label>Ponding depth in centimetres<input type="number" required min={0} max={150} step={1} value={s.draft.amount ?? ''} onChange={(e)=>{desk.field('amount',e.nativeEvent)}} /></label><label>Due date<input required type="date"  value={s.draft.due} onChange={(e)=>{desk.field('due',e.nativeEvent)}} /></label>
<label className="wide">Site condition and action<textarea required maxLength={500} rows={3} value={s.draft.notes} onChange={(e)=>{desk.field('notes',e.nativeEvent)}}></textarea></label>
{s.error&&<><p role="alert" className="wide">{s.error}</p></>}
<div className="wide form-actions"><button type="submit" disabled={s.saving}>{s.saving?'Saving…':'Save record'}</button><a href="#board">Cancel</a></div></form></div></>}
{s.page==='guide'&&<><div className="inner"><p className="eyebrow">GREEN INFRASTRUCTURE / PLAYBOOK</p><h1>What to check after rainfall</h1><article className="panel guide"><h2>Review checklist</h2><p>Inspect the inlet, note standing water and make sure overflow paths are clear. Record the depth and inspection time separately from any proposed repair.</p><h2>Before closing a record</h2><p>Only mark the inspection cleared once the crew records what changed and when the site was checked again.</p><a href="https://www.brussels.be/rainbow-project">Read the official background</a></article></div></>}
</main><footer className="wrap footer">Rain Garden Inspection Log <span>·</span> Sample workspace</footer></>
}
createRoot(document.getElementById('app')!).render(<App />)
